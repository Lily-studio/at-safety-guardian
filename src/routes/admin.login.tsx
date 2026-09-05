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
  const [mode, setMode] = useState<"login" | "reset">("login");

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) return toast.error("Identifiants invalides");
    const { data: isAdmin } = await supabase.rpc("is_admin");
    if (!isAdmin) {
      await supabase.auth.signOut();
      return toast.error("Ce compte n'a pas les droits d'administration.");
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
          {mode === "login" ? "Connectez-vous pour gérer le site." : "Recevez un lien de réinitialisation."}
        </p>
        <form onSubmit={mode === "login" ? signIn : sendReset} className="mt-6 space-y-4">
          <label className="block">
            <span className="block text-sm font-medium text-primary mb-1.5">E-mail</span>
            <input type="email" required autoComplete="email" className={input} value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          {mode === "login" && (
            <label className="block">
              <span className="block text-sm font-medium text-primary mb-1.5">Mot de passe</span>
              <input type="password" required autoComplete="current-password" className={input} value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
          )}
          <button type="submit" disabled={busy} className="btn-accent w-full justify-center disabled:opacity-60">
            {busy && <Loader2 size={16} className="animate-spin" />}
            {mode === "login" ? "Se connecter" : "Envoyer le lien"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "login" ? "reset" : "login")}
          className="mt-4 text-sm text-accent hover:underline"
        >
          {mode === "login" ? "Mot de passe oublié ?" : "Retour à la connexion"}
        </button>
      </div>
    </div>
  );
}
