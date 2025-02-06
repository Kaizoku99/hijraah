-- Create chat_messages table
create table if not exists public.chat_messages (
    id text primary key,
    session_id text not null,
    user_id uuid not null references auth.users(id),
    role text not null check (role in ('system', 'user', 'assistant')),
    content text not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Add RLS policies
alter table public.chat_messages enable row level security;

-- Allow users to read their own messages
create policy "Users can read their own messages"
    on public.chat_messages
    for select
    using (auth.uid() = user_id);

-- Allow users to insert their own messages
create policy "Users can insert their own messages"
    on public.chat_messages
    for insert
    with check (auth.uid() = user_id);

-- Create index for faster queries
create index chat_messages_session_id_idx on public.chat_messages(session_id);
create index chat_messages_user_id_idx on public.chat_messages(user_id);

-- Set up updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger handle_chat_messages_updated_at
    before update on public.chat_messages
    for each row
    execute procedure public.handle_updated_at(); 