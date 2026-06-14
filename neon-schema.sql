-- SGC Abogados — Schema para Neon (PostgreSQL)
-- Ejecuta este script en la consola SQL de Neon después de crear la base de datos.

CREATE TABLE IF NOT EXISTS reviews (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         varchar(80)  NOT NULL,
  role         varchar(120),
  quote        text         NOT NULL,
  stars        smallint     NOT NULL CHECK (stars >= 1 AND stars <= 5),
  status       varchar(20)  NOT NULL DEFAULT 'pending',
  action_token text         NOT NULL DEFAULT '',
  created_at   timestamptz  NOT NULL DEFAULT now(),
  decided_at   timestamptz
);

CREATE TABLE IF NOT EXISTS social_links (
  id         serial PRIMARY KEY,
  platform   varchar(60)  NOT NULL,
  label      varchar(120) NOT NULL,
  url        text         NOT NULL,
  enabled    boolean      NOT NULL DEFAULT true,
  sort_order integer      NOT NULL DEFAULT 0
);
