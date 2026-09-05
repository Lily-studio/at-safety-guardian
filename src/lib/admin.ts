import { useQuery, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { toast } from "sonner";

export type AdminTable =
  | "formations"
  | "services"
  | "sectors"
  | "client_references"
  | "sections"
  | "nav_items"
  | "seo_pages"
  | "media"
  | "leads";

export type Row = Record<string, unknown> & { id: string };

const MEDIA_BUCKET = "media";
const SIGNED_TTL = 60 * 60 * 24 * 365 * 5; // 5 years

export function adminKey(table: AdminTable): QueryKey {
  return ["admin", table];
}

export function useAdminRows(table: AdminTable, orderBy = "sort_order") {
  return useQuery({
    queryKey: adminKey(table),
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select("*").order(orderBy, { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as Row[];
    },
  });
}

export function useSettingsRows() {
  return useQuery({
    queryKey: ["admin", "site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      return (data ?? []) as Tables<"site_settings">[];
    },
  });
}

export function useAdminMutations(table: AdminTable) {
  const qc = useQueryClient();
  const done = async (message: string) => {
    await qc.invalidateQueries({ queryKey: adminKey(table) });
    await qc.invalidateQueries({ queryKey: ["site-content"] });
    toast.success(message);
  };

  return {
    async create(values: Record<string, unknown>) {
      const { error } = await supabase.from(table).insert(values as never);
      if (error) return toast.error(error.message);
      await done("Créé");
    },
    async update(id: string, values: Record<string, unknown>) {
      const { error } = await supabase.from(table).update(values as never).eq("id", id);
      if (error) return toast.error(error.message);
      await done("Enregistré");
    },
    async remove(id: string) {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) return toast.error(error.message);
      await done("Supprimé");
    },
    async reorder(ids: string[]) {
      const updates = ids.map((id, i) => supabase.from(table).update({ sort_order: i } as never).eq("id", id));
      const results = await Promise.all(updates);
      const failed = results.find((r) => r.error);
      if (failed?.error) return toast.error(failed.error.message);
      await done("Ordre mis à jour");
    },
  };
}

export async function saveSetting(key: string, value: unknown) {
  const { error } = await supabase.from("site_settings").upsert({ key, value: value as never }, { onConflict: "key" });
  if (error) {
    toast.error(error.message);
    return false;
  }
  toast.success("Enregistré");
  return true;
}

export async function uploadMedia(file: File, folder = "general") {
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${folder}/${Date.now()}-${safe}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, { upsert: false });
  if (error) {
    toast.error(error.message);
    return null;
  }
  const { data: signed } = await supabase.storage.from(MEDIA_BUCKET).createSignedUrl(path, SIGNED_TTL);
  const url = signed?.signedUrl ?? "";
  const { error: dbError } = await supabase.from("media").insert({
    name: file.name,
    path,
    url,
    mime_type: file.type,
    size_bytes: file.size,
    folder,
  });
  if (dbError) toast.error(dbError.message);
  return { path, url };
}

export async function deleteMedia(id: string, path: string) {
  await supabase.storage.from(MEDIA_BUCKET).remove([path]);
  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) {
    toast.error(error.message);
    return false;
  }
  toast.success("Fichier supprimé");
  return true;
}

export type AdminSession = {
  loading: boolean;
  email: string | null;
  isAdmin: boolean;
};

export function useAdminSession(): AdminSession {
  const [state, setState] = useState<AdminSession>({ loading: true, email: null, isAdmin: false });

  useEffect(() => {
    let active = true;
    const check = async () => {
      const { data } = await supabase.auth.getUser();
      if (!active) return;
      if (!data.user) return setState({ loading: false, email: null, isAdmin: false });
      const { data: isAdmin } = await supabase.rpc("is_admin");
      if (!active) return;
      setState({ loading: false, email: data.user.email ?? null, isAdmin: !!isAdmin });
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") check();
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
