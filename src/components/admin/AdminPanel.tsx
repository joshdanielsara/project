"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

type RecipientState = {
  yourEmail: string;
  herEmail: string;
  yesNotifiedAt: string | null;
};

export function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [herEmail, setHerEmail] = useState("");
  const [yesNotifiedAt, setYesNotifiedAt] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadRecipients = useCallback(async () => {
    const response = await fetch("/api/admin/recipients");
    if (!response.ok) {
      setAuthenticated(false);
      return;
    }
    const data = (await response.json()) as RecipientState;
    setYourEmail(data.yourEmail || "");
    setHerEmail(data.herEmail || "");
    setYesNotifiedAt(data.yesNotifiedAt);
    setAuthenticated(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const auth = await fetch("/api/admin/auth");
        const data = (await auth.json()) as { authenticated?: boolean };
        if (cancelled) return;
        if (data.authenticated) {
          await loadRecipients();
        }
      } catch {
        if (!cancelled) setError("Could not reach the admin API.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadRecipients]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setSaving(true);
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Login failed.");
        return;
      }
      setPassword("");
      await loadRecipients();
      setMessage("Signed in.");
    } catch {
      setError("Login request failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setSaving(true);
    try {
      const response = await fetch("/api/admin/recipients", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ yourEmail, herEmail }),
      });
      const data = (await response.json()) as RecipientState & { error?: string };
      if (!response.ok) {
        setError(data.error || "Could not save recipients.");
        return;
      }
      setYourEmail(data.yourEmail);
      setHerEmail(data.herEmail);
      setYesNotifiedAt(data.yesNotifiedAt);
      setMessage("Recipient emails saved.");
    } catch {
      setError("Save request failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleResetFlag = async () => {
    setError(null);
    setMessage(null);
    setSaving(true);
    try {
      const response = await fetch("/api/admin/recipients", { method: "PATCH" });
      const data = (await response.json()) as RecipientState & { error?: string };
      if (!response.ok) {
        setError(data.error || "Could not reset notification flag.");
        return;
      }
      setYesNotifiedAt(data.yesNotifiedAt);
      setMessage("YES notification flag cleared. Emails can send again.");
    } catch {
      setError("Reset request failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
    setMessage("Signed out.");
  };

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#f7f4ef] text-sm text-[#6f675e]">
        Loading admin...
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#f7f4ef] px-4 py-10">
      <div className="mx-auto w-full max-w-lg rounded-2xl border border-[#e8e2da] bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6570]">
          Proposal admin
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold text-[#3f3a35]">
          Email recipients
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#6f675e]">
          Control which addresses receive the YES notification emails. Brevo credentials stay on
          the server in environment variables.
        </p>

        {!authenticated ? (
          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <label className="block text-sm font-medium text-[#3f3a35]" htmlFor="password">
              Admin password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-[#dadce0] px-3 py-2.5 text-sm outline-none focus:border-[#f43f6a]"
              required
            />
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#3f3a35] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? "Signing in..." : "Sign in"}
            </button>
          </form>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSave}>
            <div>
              <label className="block text-sm font-medium text-[#3f3a35]" htmlFor="yourEmail">
                Your email (notification)
              </label>
              <input
                id="yourEmail"
                type="email"
                value={yourEmail}
                onChange={(event) => setYourEmail(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#dadce0] px-3 py-2.5 text-sm outline-none focus:border-[#f43f6a]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3f3a35]" htmlFor="herEmail">
                Her email (keepsake)
              </label>
              <input
                id="herEmail"
                type="email"
                value={herEmail}
                onChange={(event) => setHerEmail(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#dadce0] px-3 py-2.5 text-sm outline-none focus:border-[#f43f6a]"
                required
              />
            </div>

            <p className="rounded-xl bg-[#fff5f7] px-3 py-2 text-xs text-[#8a6570]">
              YES emails sent:{" "}
              {yesNotifiedAt
                ? new Date(yesNotifiedAt).toLocaleString()
                : "Not yet"}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-[#f43f6a] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save recipients"}
              </button>
              <button
                type="button"
                disabled={saving || !yesNotifiedAt}
                onClick={handleResetFlag}
                className="rounded-full border border-[#dadce0] px-5 py-2.5 text-sm font-semibold text-[#3f3a35] disabled:opacity-50"
              >
                Reset YES flag
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-[#dadce0] px-5 py-2.5 text-sm font-semibold text-[#6f675e]"
              >
                Sign out
              </button>
            </div>
          </form>
        )}

        {message && (
          <p className="mt-4 rounded-xl bg-[#e8f5e9] px-3 py-2 text-sm text-[#2e7d32]">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 rounded-xl bg-[#fce8e6] px-3 py-2 text-sm text-[#d93025]" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
