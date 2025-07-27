-- Create get_related_edges function to encapsulate KG edge lookup for a set of entity names
-- Returns relationships where either the source or target entity matches any of the provided names

create or replace function public.get_related_edges(p_entity_names text[])
returns table (
    relationship_type text,
    source_entity_id uuid,
    source_entity_name text,
    target_entity_id uuid,
    target_entity_name text
) as $$
  select
    r.relationship_type,
    r.source_entity_id,
    s.entity_name as source_entity_name,
    r.target_entity_id,
    t.entity_name as target_entity_name
  from public.kg_relationships r
  join public.kg_entities s on s.id = r.source_entity_id
  join public.kg_entities t on t.id = r.target_entity_id
  where s.entity_name = any(p_entity_names)
     or t.entity_name = any(p_entity_names);
$$ language sql stable;

-- Grant execute to anon and authenticated roles so it can be called via PostgREST
grant execute on function public.get_related_edges(text[]) to anon, authenticated; 