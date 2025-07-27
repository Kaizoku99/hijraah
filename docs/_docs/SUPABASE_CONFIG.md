# Supabase Configuration in Restructured Project

This document outlines the important configuration for Supabase in the restructured project, particularly focusing on the port configuration to avoid Windows conflicts.

## Port Configuration

In `supabase/config.toml`, the shadow port has been updated from the default `54320` to `54800` to prevent conflicts with Windows reserved ports:

```toml
[db]
# Port to use for the local database URL.
port = 54322
# Port used by db diff command to initialize the shadow database.
shadow_port = 54800  # Changed from default 54320 to avoid Windows conflicts
```

## Supabase Client Configuration

The Supabase client configuration has been moved to:

```
src/_infrastructure/supabase/
```

Key files:

- `client.ts` - Browser client
- `server.ts` - Server-side client
- `realtime.ts` - Realtime subscriptions

## Testing Supabase Connection

When testing your Supabase connection after the restructuring, use the following command to ensure everything is working correctly:

```bash
supabase status
```

If you encounter any port conflicts, confirm that the shadow_port is set to 54800 in the config.toml file.

## Important Notes

1. **Windows Port Conflict**: Windows reserves certain ports, including 54320 (the default Supabase shadow_port). Using port 54800 avoids this conflict.

2. **Error Signature**: If you see an error like "failed to start docker container: Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:54320 -> 127.0.0.1:0: listen tcp 0.0.0.0:54320: bind: An attempt was made to access a socket in a way forbidden by its access permissions", check that the shadow_port is correctly set to 54800.

3. **After Project Updates**: If you pull updates from version control or reset your Supabase instance, always verify that the shadow_port is still set to 54800 to avoid Windows port conflicts.
