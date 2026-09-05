import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { input } from "@/components/admin/fields";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Connexion administrateur — AT SAFETY PRIVE" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"login" | "reset" | "setup">("login");

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) return toast.error("Identifiants invalides");
    let { data: isAdmin } = await supabase.rpc("is_admin");
    if (!isAdmin) {
      // First installation: the very first account becomes the administrator.
      const { data: claimed } = await supabase.rpc("claim_first_admin");
      isAdmin = !!claimed;
    }
    if (!isAdmin) {
      await supabase.auth.signOut();
      return toast.error("Ce compte n'a pas les droits d'administration.");
    }
    navigate({ to: "/admin", replace: true });
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: `${window.location.origin}/admin/login` },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    if (!data.session) {
      toast.success("Compte créé. Confirmez votre e-mail puis connectez-vous.");
      return setMode("login");
    }
    const { data: claimed } = await supabase.rpc("claim_first_admin");
    if (!claimed) {
      await supabase.auth.signOut();
      return toast.error("Un administrateur existe déjà. Demandez-lui un accès.");
    }
    navigate({ to: "/admin", replace: true });
  };


  const sendReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin/login`,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("E-mail de réinitialisation envoyé.");
    setMode("login");
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-white p-7 shadow-[var(--shadow-card)]">
        <div className="w-11 h-11 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
          <Lock size={20} />
        </div>
        <h1 className="mt-4 text-xl font-bold text-primary">Espace d'administration</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "login"
            ? "Connectez-vous pour gérer le site."
            : mode === "reset"
              ? "Recevez un lien de réinitialisation."
              : "Première installation : créez le compte administrateur."}
        </p>
        <form onSubmit={mode === "login" ? signIn : mode === "setup" ? signUp : sendReset} className="mt-6 space-y-4">
          <label className="block">
            <span className="block text-sm font-medium text-primary mb-1.5">E-mail</span>
            <input type="email" required autoComplete="email" className={input} value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          {mode !== "reset" && (
            <label className="block">
              <span className="block text-sm font-medium text-primary mb-1.5">Mot de passe</span>
              <input
                type="password"
                required
                minLength={8}
                autoComplete={mode === "setup" ? "new-password" : "current-password"}
                className={input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          )}
          <button type="submit" disabled={busy} className="btn-accent w-full justify-center disabled:opacity-60">
            {busy && <Loader2 size={16} className="animate-spin" />}
            {mode === "login" ? "Se connecter" : mode === "setup" ? "Créer le compte" : "Envoyer le lien"}
          </button>
        </form>
        <div className="mt-4 flex flex-col gap-1 text-sm">
          <button onClick={() => setMode(mode === "reset" ? "login" : "reset")} className="text-accent hover:underline text-left">
            {mode === "reset" ? "Retour à la connexion" : "Mot de passe oublié ?"}
          </button>
          <button onClick={() => setMode(mode === "setup" ? "login" : "setup")} className="text-muted-foreground hover:underline text-left">
            {mode === "setup" ? "Retour à la connexion" : "Première installation ?"}
          </button>
        </div>

      </div>
    </div>
  );
}
