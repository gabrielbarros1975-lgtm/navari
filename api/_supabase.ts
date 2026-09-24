import { createClient } from "@supabase/supabase-js";

/**
 * Cliente do Supabase para uso no servidor (webhook). Usa a Service Role Key,
 * que ignora RLS — por isso NUNCA deve ser exposta no frontend, só em
 * variáveis de ambiente do servidor (Vercel).
 *
 * Variáveis de ambiente:
 * - SUPABASE_URL: URL do projeto (Settings → API).
 * - SUPABASE_SERVICE_ROLE_KEY: chave "service_role" (Settings → API).
 *
 * Tabela esperada (rodar no SQL Editor do Supabase):
 *
 *   create table orders (
 *     id text primary key,           -- id da order na Mercado Pago (ex: ORD...)
 *     tier_id text,                  -- external_reference (ex: "ao-vivo")
 *     email text,
 *     name text,                     -- nome do comprador, para o certificado
 *     status text,                   -- último status conhecido da order
 *     amount numeric,
 *     email_sent_at timestamptz,
 *     created_at timestamptz not null default now(),
 *     updated_at timestamptz not null default now()
 *   );
 */
export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
