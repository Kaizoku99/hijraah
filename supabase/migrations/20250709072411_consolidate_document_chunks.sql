create sequence "public"."api_config_id_seq";

drop trigger if exists "update_artifacts_updated_at" on "public"."artifacts";

drop trigger if exists "update_suggestions_updated_at" on "public"."suggestions";

drop trigger if exists "update_web_indexes_updated_at" on "public"."web_indexes";

drop policy "Users can manage their own chats" on "public"."Chat";

drop policy "Users can view public chats" on "public"."Chat";

drop policy "Users can manage their own documents" on "public"."Document";

drop policy "Users can manage messages in their chats" on "public"."Message";

drop policy "Users can manage messages v2 in their chats" on "public"."Message_v2";

drop policy "Users can manage streams in their chats" on "public"."Stream";

drop policy "Users can manage suggestions for their documents" on "public"."Suggestion";

drop policy "Service role can manage users" on "public"."User";

drop policy "Users can manage votes in their chats" on "public"."Vote";

drop policy "Users can manage votes v2 in their chats" on "public"."Vote_v2";

drop policy "Service role can manage all artifacts" on "public"."artifacts";

drop policy "Users can manage their own artifacts" on "public"."artifacts";

drop policy "Service role can manage all crawl jobs" on "public"."crawl_jobs";

drop policy "Users can view crawl jobs for their web indexes" on "public"."crawl_jobs";

drop policy "Service role can access all chunks_enhanced" on "public"."document_chunks_enhanced";

drop policy "Users can view chunks for their own documents" on "public"."document_chunks_enhanced";

drop policy "Authenticated users can view image embeddings" on "public"."image_embeddings";

drop policy "Service role can manage image_embeddings" on "public"."image_embeddings";

drop policy "Authenticated users can view active kg_entities" on "public"."kg_entities";

drop policy "Service role can manage kg_entities" on "public"."kg_entities";

drop policy "Authenticated users can view kg_relationships" on "public"."kg_relationships";

drop policy "Service role can manage kg_relationships" on "public"."kg_relationships";

drop policy "Users can manage their own legacy chats" on "public"."legacy_chats";

drop policy "Service role can manage all legacy messages" on "public"."legacy_messages";

drop policy "Users can access messages in their own legacy chats" on "public"."legacy_messages";

drop policy "Service role can manage all legacy messages_v2" on "public"."legacy_messages_v2";

drop policy "Users can access messages_v2 in their own legacy chats" on "public"."legacy_messages_v2";

drop policy "Service role can manage all legacy votes" on "public"."legacy_votes";

drop policy "Users can vote on messages in their own legacy chats" on "public"."legacy_votes";

drop policy "Service role can manage all legacy votes_v2" on "public"."legacy_votes_v2";

drop policy "Users can vote_v2 on messages in their own legacy chats" on "public"."legacy_votes_v2";

drop policy "Authenticated users can view policy timeline" on "public"."policy_timeline";

drop policy "Service role can manage policy timeline" on "public"."policy_timeline";

drop policy "Service role can manage rag_cache_meta" on "public"."rag_cache_meta";

drop policy "Service role can manage rag_query_cache" on "public"."rag_query_cache";

drop policy "Service role can manage all streams" on "public"."streams";

drop policy "Users can manage their own streams" on "public"."streams";

drop policy "Service role can manage all suggestions" on "public"."suggestions";

drop policy "Users can manage their own suggestions" on "public"."suggestions";

drop policy "Service role can manage cache metadata" on "public"."upstash_cache_meta";

drop policy "Service role can manage all query history" on "public"."user_query_history";

drop policy "Users can insert their own query history" on "public"."user_query_history";

drop policy "Users can view their own query history" on "public"."user_query_history";

drop policy "Service role can manage all web indexes" on "public"."web_indexes";

drop policy "Users can manage their own web indexes" on "public"."web_indexes";

drop policy "Users can view public web indexes" on "public"."web_indexes";

drop policy "Admin and service_role can manage scrape_configurations" on "public"."scrape_configurations";

drop policy "Admin and service_role can manage scrape_history" on "public"."scrape_history";

drop policy "Admin and service_role can access scraping_logs" on "public"."scraping_logs";

drop policy "Admin users can manage scraping_sources" on "public"."scraping_sources";

drop policy "Admin and service_role can manage source_validations" on "public"."source_validations";

revoke delete on table "public"."Document" from "anon";

revoke insert on table "public"."Document" from "anon";

revoke references on table "public"."Document" from "anon";

revoke select on table "public"."Document" from "anon";

revoke trigger on table "public"."Document" from "anon";

revoke truncate on table "public"."Document" from "anon";

revoke update on table "public"."Document" from "anon";

revoke delete on table "public"."Document" from "authenticated";

revoke insert on table "public"."Document" from "authenticated";

revoke references on table "public"."Document" from "authenticated";

revoke select on table "public"."Document" from "authenticated";

revoke trigger on table "public"."Document" from "authenticated";

revoke truncate on table "public"."Document" from "authenticated";

revoke update on table "public"."Document" from "authenticated";

revoke delete on table "public"."Document" from "service_role";

revoke insert on table "public"."Document" from "service_role";

revoke references on table "public"."Document" from "service_role";

revoke select on table "public"."Document" from "service_role";

revoke trigger on table "public"."Document" from "service_role";

revoke truncate on table "public"."Document" from "service_role";

revoke update on table "public"."Document" from "service_role";

revoke delete on table "public"."Suggestion" from "anon";

revoke insert on table "public"."Suggestion" from "anon";

revoke references on table "public"."Suggestion" from "anon";

revoke select on table "public"."Suggestion" from "anon";

revoke trigger on table "public"."Suggestion" from "anon";

revoke truncate on table "public"."Suggestion" from "anon";

revoke update on table "public"."Suggestion" from "anon";

revoke delete on table "public"."Suggestion" from "authenticated";

revoke insert on table "public"."Suggestion" from "authenticated";

revoke references on table "public"."Suggestion" from "authenticated";

revoke select on table "public"."Suggestion" from "authenticated";

revoke trigger on table "public"."Suggestion" from "authenticated";

revoke truncate on table "public"."Suggestion" from "authenticated";

revoke update on table "public"."Suggestion" from "authenticated";

revoke delete on table "public"."Suggestion" from "service_role";

revoke insert on table "public"."Suggestion" from "service_role";

revoke references on table "public"."Suggestion" from "service_role";

revoke select on table "public"."Suggestion" from "service_role";

revoke trigger on table "public"."Suggestion" from "service_role";

revoke truncate on table "public"."Suggestion" from "service_role";

revoke update on table "public"."Suggestion" from "service_role";

revoke delete on table "public"."User" from "anon";

revoke insert on table "public"."User" from "anon";

revoke references on table "public"."User" from "anon";

revoke select on table "public"."User" from "anon";

revoke trigger on table "public"."User" from "anon";

revoke truncate on table "public"."User" from "anon";

revoke update on table "public"."User" from "anon";

revoke delete on table "public"."User" from "authenticated";

revoke insert on table "public"."User" from "authenticated";

revoke references on table "public"."User" from "authenticated";

revoke select on table "public"."User" from "authenticated";

revoke trigger on table "public"."User" from "authenticated";

revoke truncate on table "public"."User" from "authenticated";

revoke update on table "public"."User" from "authenticated";

revoke delete on table "public"."User" from "service_role";

revoke insert on table "public"."User" from "service_role";

revoke references on table "public"."User" from "service_role";

revoke select on table "public"."User" from "service_role";

revoke trigger on table "public"."User" from "service_role";

revoke truncate on table "public"."User" from "service_role";

revoke update on table "public"."User" from "service_role";

revoke delete on table "public"."artifacts" from "anon";

revoke insert on table "public"."artifacts" from "anon";

revoke references on table "public"."artifacts" from "anon";

revoke select on table "public"."artifacts" from "anon";

revoke trigger on table "public"."artifacts" from "anon";

revoke truncate on table "public"."artifacts" from "anon";

revoke update on table "public"."artifacts" from "anon";

revoke delete on table "public"."artifacts" from "authenticated";

revoke insert on table "public"."artifacts" from "authenticated";

revoke references on table "public"."artifacts" from "authenticated";

revoke select on table "public"."artifacts" from "authenticated";

revoke trigger on table "public"."artifacts" from "authenticated";

revoke truncate on table "public"."artifacts" from "authenticated";

revoke update on table "public"."artifacts" from "authenticated";

revoke delete on table "public"."artifacts" from "service_role";

revoke insert on table "public"."artifacts" from "service_role";

revoke references on table "public"."artifacts" from "service_role";

revoke select on table "public"."artifacts" from "service_role";

revoke trigger on table "public"."artifacts" from "service_role";

revoke truncate on table "public"."artifacts" from "service_role";

revoke update on table "public"."artifacts" from "service_role";

revoke delete on table "public"."crawl_jobs" from "anon";

revoke insert on table "public"."crawl_jobs" from "anon";

revoke references on table "public"."crawl_jobs" from "anon";

revoke select on table "public"."crawl_jobs" from "anon";

revoke trigger on table "public"."crawl_jobs" from "anon";

revoke truncate on table "public"."crawl_jobs" from "anon";

revoke update on table "public"."crawl_jobs" from "anon";

revoke delete on table "public"."crawl_jobs" from "authenticated";

revoke insert on table "public"."crawl_jobs" from "authenticated";

revoke references on table "public"."crawl_jobs" from "authenticated";

revoke select on table "public"."crawl_jobs" from "authenticated";

revoke trigger on table "public"."crawl_jobs" from "authenticated";

revoke truncate on table "public"."crawl_jobs" from "authenticated";

revoke update on table "public"."crawl_jobs" from "authenticated";

revoke delete on table "public"."crawl_jobs" from "service_role";

revoke insert on table "public"."crawl_jobs" from "service_role";

revoke references on table "public"."crawl_jobs" from "service_role";

revoke select on table "public"."crawl_jobs" from "service_role";

revoke trigger on table "public"."crawl_jobs" from "service_role";

revoke truncate on table "public"."crawl_jobs" from "service_role";

revoke update on table "public"."crawl_jobs" from "service_role";

revoke delete on table "public"."document_chunks_enhanced" from "anon";

revoke insert on table "public"."document_chunks_enhanced" from "anon";

revoke references on table "public"."document_chunks_enhanced" from "anon";

revoke select on table "public"."document_chunks_enhanced" from "anon";

revoke trigger on table "public"."document_chunks_enhanced" from "anon";

revoke truncate on table "public"."document_chunks_enhanced" from "anon";

revoke update on table "public"."document_chunks_enhanced" from "anon";

revoke delete on table "public"."document_chunks_enhanced" from "authenticated";

revoke insert on table "public"."document_chunks_enhanced" from "authenticated";

revoke references on table "public"."document_chunks_enhanced" from "authenticated";

revoke select on table "public"."document_chunks_enhanced" from "authenticated";

revoke trigger on table "public"."document_chunks_enhanced" from "authenticated";

revoke truncate on table "public"."document_chunks_enhanced" from "authenticated";

revoke update on table "public"."document_chunks_enhanced" from "authenticated";

revoke delete on table "public"."document_chunks_enhanced" from "service_role";

revoke insert on table "public"."document_chunks_enhanced" from "service_role";

revoke references on table "public"."document_chunks_enhanced" from "service_role";

revoke select on table "public"."document_chunks_enhanced" from "service_role";

revoke trigger on table "public"."document_chunks_enhanced" from "service_role";

revoke truncate on table "public"."document_chunks_enhanced" from "service_role";

revoke update on table "public"."document_chunks_enhanced" from "service_role";

revoke delete on table "public"."image_embeddings" from "anon";

revoke insert on table "public"."image_embeddings" from "anon";

revoke references on table "public"."image_embeddings" from "anon";

revoke select on table "public"."image_embeddings" from "anon";

revoke trigger on table "public"."image_embeddings" from "anon";

revoke truncate on table "public"."image_embeddings" from "anon";

revoke update on table "public"."image_embeddings" from "anon";

revoke delete on table "public"."image_embeddings" from "authenticated";

revoke insert on table "public"."image_embeddings" from "authenticated";

revoke references on table "public"."image_embeddings" from "authenticated";

revoke select on table "public"."image_embeddings" from "authenticated";

revoke trigger on table "public"."image_embeddings" from "authenticated";

revoke truncate on table "public"."image_embeddings" from "authenticated";

revoke update on table "public"."image_embeddings" from "authenticated";

revoke delete on table "public"."image_embeddings" from "service_role";

revoke insert on table "public"."image_embeddings" from "service_role";

revoke references on table "public"."image_embeddings" from "service_role";

revoke select on table "public"."image_embeddings" from "service_role";

revoke trigger on table "public"."image_embeddings" from "service_role";

revoke truncate on table "public"."image_embeddings" from "service_role";

revoke update on table "public"."image_embeddings" from "service_role";

revoke delete on table "public"."kg_entities" from "anon";

revoke insert on table "public"."kg_entities" from "anon";

revoke references on table "public"."kg_entities" from "anon";

revoke select on table "public"."kg_entities" from "anon";

revoke trigger on table "public"."kg_entities" from "anon";

revoke truncate on table "public"."kg_entities" from "anon";

revoke update on table "public"."kg_entities" from "anon";

revoke delete on table "public"."kg_entities" from "authenticated";

revoke insert on table "public"."kg_entities" from "authenticated";

revoke references on table "public"."kg_entities" from "authenticated";

revoke select on table "public"."kg_entities" from "authenticated";

revoke trigger on table "public"."kg_entities" from "authenticated";

revoke truncate on table "public"."kg_entities" from "authenticated";

revoke update on table "public"."kg_entities" from "authenticated";

revoke delete on table "public"."kg_entities" from "service_role";

revoke insert on table "public"."kg_entities" from "service_role";

revoke references on table "public"."kg_entities" from "service_role";

revoke select on table "public"."kg_entities" from "service_role";

revoke trigger on table "public"."kg_entities" from "service_role";

revoke truncate on table "public"."kg_entities" from "service_role";

revoke update on table "public"."kg_entities" from "service_role";

revoke delete on table "public"."kg_relationships" from "anon";

revoke insert on table "public"."kg_relationships" from "anon";

revoke references on table "public"."kg_relationships" from "anon";

revoke select on table "public"."kg_relationships" from "anon";

revoke trigger on table "public"."kg_relationships" from "anon";

revoke truncate on table "public"."kg_relationships" from "anon";

revoke update on table "public"."kg_relationships" from "anon";

revoke delete on table "public"."kg_relationships" from "authenticated";

revoke insert on table "public"."kg_relationships" from "authenticated";

revoke references on table "public"."kg_relationships" from "authenticated";

revoke select on table "public"."kg_relationships" from "authenticated";

revoke trigger on table "public"."kg_relationships" from "authenticated";

revoke truncate on table "public"."kg_relationships" from "authenticated";

revoke update on table "public"."kg_relationships" from "authenticated";

revoke delete on table "public"."kg_relationships" from "service_role";

revoke insert on table "public"."kg_relationships" from "service_role";

revoke references on table "public"."kg_relationships" from "service_role";

revoke select on table "public"."kg_relationships" from "service_role";

revoke trigger on table "public"."kg_relationships" from "service_role";

revoke truncate on table "public"."kg_relationships" from "service_role";

revoke update on table "public"."kg_relationships" from "service_role";

revoke delete on table "public"."legacy_chats" from "anon";

revoke insert on table "public"."legacy_chats" from "anon";

revoke references on table "public"."legacy_chats" from "anon";

revoke select on table "public"."legacy_chats" from "anon";

revoke trigger on table "public"."legacy_chats" from "anon";

revoke truncate on table "public"."legacy_chats" from "anon";

revoke update on table "public"."legacy_chats" from "anon";

revoke delete on table "public"."legacy_chats" from "authenticated";

revoke insert on table "public"."legacy_chats" from "authenticated";

revoke references on table "public"."legacy_chats" from "authenticated";

revoke select on table "public"."legacy_chats" from "authenticated";

revoke trigger on table "public"."legacy_chats" from "authenticated";

revoke truncate on table "public"."legacy_chats" from "authenticated";

revoke update on table "public"."legacy_chats" from "authenticated";

revoke delete on table "public"."legacy_chats" from "service_role";

revoke insert on table "public"."legacy_chats" from "service_role";

revoke references on table "public"."legacy_chats" from "service_role";

revoke select on table "public"."legacy_chats" from "service_role";

revoke trigger on table "public"."legacy_chats" from "service_role";

revoke truncate on table "public"."legacy_chats" from "service_role";

revoke update on table "public"."legacy_chats" from "service_role";

revoke delete on table "public"."legacy_messages" from "anon";

revoke insert on table "public"."legacy_messages" from "anon";

revoke references on table "public"."legacy_messages" from "anon";

revoke select on table "public"."legacy_messages" from "anon";

revoke trigger on table "public"."legacy_messages" from "anon";

revoke truncate on table "public"."legacy_messages" from "anon";

revoke update on table "public"."legacy_messages" from "anon";

revoke delete on table "public"."legacy_messages" from "authenticated";

revoke insert on table "public"."legacy_messages" from "authenticated";

revoke references on table "public"."legacy_messages" from "authenticated";

revoke select on table "public"."legacy_messages" from "authenticated";

revoke trigger on table "public"."legacy_messages" from "authenticated";

revoke truncate on table "public"."legacy_messages" from "authenticated";

revoke update on table "public"."legacy_messages" from "authenticated";

revoke delete on table "public"."legacy_messages" from "service_role";

revoke insert on table "public"."legacy_messages" from "service_role";

revoke references on table "public"."legacy_messages" from "service_role";

revoke select on table "public"."legacy_messages" from "service_role";

revoke trigger on table "public"."legacy_messages" from "service_role";

revoke truncate on table "public"."legacy_messages" from "service_role";

revoke update on table "public"."legacy_messages" from "service_role";

revoke delete on table "public"."legacy_messages_v2" from "anon";

revoke insert on table "public"."legacy_messages_v2" from "anon";

revoke references on table "public"."legacy_messages_v2" from "anon";

revoke select on table "public"."legacy_messages_v2" from "anon";

revoke trigger on table "public"."legacy_messages_v2" from "anon";

revoke truncate on table "public"."legacy_messages_v2" from "anon";

revoke update on table "public"."legacy_messages_v2" from "anon";

revoke delete on table "public"."legacy_messages_v2" from "authenticated";

revoke insert on table "public"."legacy_messages_v2" from "authenticated";

revoke references on table "public"."legacy_messages_v2" from "authenticated";

revoke select on table "public"."legacy_messages_v2" from "authenticated";

revoke trigger on table "public"."legacy_messages_v2" from "authenticated";

revoke truncate on table "public"."legacy_messages_v2" from "authenticated";

revoke update on table "public"."legacy_messages_v2" from "authenticated";

revoke delete on table "public"."legacy_messages_v2" from "service_role";

revoke insert on table "public"."legacy_messages_v2" from "service_role";

revoke references on table "public"."legacy_messages_v2" from "service_role";

revoke select on table "public"."legacy_messages_v2" from "service_role";

revoke trigger on table "public"."legacy_messages_v2" from "service_role";

revoke truncate on table "public"."legacy_messages_v2" from "service_role";

revoke update on table "public"."legacy_messages_v2" from "service_role";

revoke delete on table "public"."legacy_votes" from "anon";

revoke insert on table "public"."legacy_votes" from "anon";

revoke references on table "public"."legacy_votes" from "anon";

revoke select on table "public"."legacy_votes" from "anon";

revoke trigger on table "public"."legacy_votes" from "anon";

revoke truncate on table "public"."legacy_votes" from "anon";

revoke update on table "public"."legacy_votes" from "anon";

revoke delete on table "public"."legacy_votes" from "authenticated";

revoke insert on table "public"."legacy_votes" from "authenticated";

revoke references on table "public"."legacy_votes" from "authenticated";

revoke select on table "public"."legacy_votes" from "authenticated";

revoke trigger on table "public"."legacy_votes" from "authenticated";

revoke truncate on table "public"."legacy_votes" from "authenticated";

revoke update on table "public"."legacy_votes" from "authenticated";

revoke delete on table "public"."legacy_votes" from "service_role";

revoke insert on table "public"."legacy_votes" from "service_role";

revoke references on table "public"."legacy_votes" from "service_role";

revoke select on table "public"."legacy_votes" from "service_role";

revoke trigger on table "public"."legacy_votes" from "service_role";

revoke truncate on table "public"."legacy_votes" from "service_role";

revoke update on table "public"."legacy_votes" from "service_role";

revoke delete on table "public"."legacy_votes_v2" from "anon";

revoke insert on table "public"."legacy_votes_v2" from "anon";

revoke references on table "public"."legacy_votes_v2" from "anon";

revoke select on table "public"."legacy_votes_v2" from "anon";

revoke trigger on table "public"."legacy_votes_v2" from "anon";

revoke truncate on table "public"."legacy_votes_v2" from "anon";

revoke update on table "public"."legacy_votes_v2" from "anon";

revoke delete on table "public"."legacy_votes_v2" from "authenticated";

revoke insert on table "public"."legacy_votes_v2" from "authenticated";

revoke references on table "public"."legacy_votes_v2" from "authenticated";

revoke select on table "public"."legacy_votes_v2" from "authenticated";

revoke trigger on table "public"."legacy_votes_v2" from "authenticated";

revoke truncate on table "public"."legacy_votes_v2" from "authenticated";

revoke update on table "public"."legacy_votes_v2" from "authenticated";

revoke delete on table "public"."legacy_votes_v2" from "service_role";

revoke insert on table "public"."legacy_votes_v2" from "service_role";

revoke references on table "public"."legacy_votes_v2" from "service_role";

revoke select on table "public"."legacy_votes_v2" from "service_role";

revoke trigger on table "public"."legacy_votes_v2" from "service_role";

revoke truncate on table "public"."legacy_votes_v2" from "service_role";

revoke update on table "public"."legacy_votes_v2" from "service_role";

revoke delete on table "public"."policy_timeline" from "anon";

revoke insert on table "public"."policy_timeline" from "anon";

revoke references on table "public"."policy_timeline" from "anon";

revoke select on table "public"."policy_timeline" from "anon";

revoke trigger on table "public"."policy_timeline" from "anon";

revoke truncate on table "public"."policy_timeline" from "anon";

revoke update on table "public"."policy_timeline" from "anon";

revoke delete on table "public"."policy_timeline" from "authenticated";

revoke insert on table "public"."policy_timeline" from "authenticated";

revoke references on table "public"."policy_timeline" from "authenticated";

revoke select on table "public"."policy_timeline" from "authenticated";

revoke trigger on table "public"."policy_timeline" from "authenticated";

revoke truncate on table "public"."policy_timeline" from "authenticated";

revoke update on table "public"."policy_timeline" from "authenticated";

revoke delete on table "public"."policy_timeline" from "service_role";

revoke insert on table "public"."policy_timeline" from "service_role";

revoke references on table "public"."policy_timeline" from "service_role";

revoke select on table "public"."policy_timeline" from "service_role";

revoke trigger on table "public"."policy_timeline" from "service_role";

revoke truncate on table "public"."policy_timeline" from "service_role";

revoke update on table "public"."policy_timeline" from "service_role";

revoke delete on table "public"."rag_cache_meta" from "anon";

revoke insert on table "public"."rag_cache_meta" from "anon";

revoke references on table "public"."rag_cache_meta" from "anon";

revoke select on table "public"."rag_cache_meta" from "anon";

revoke trigger on table "public"."rag_cache_meta" from "anon";

revoke truncate on table "public"."rag_cache_meta" from "anon";

revoke update on table "public"."rag_cache_meta" from "anon";

revoke delete on table "public"."rag_cache_meta" from "authenticated";

revoke insert on table "public"."rag_cache_meta" from "authenticated";

revoke references on table "public"."rag_cache_meta" from "authenticated";

revoke select on table "public"."rag_cache_meta" from "authenticated";

revoke trigger on table "public"."rag_cache_meta" from "authenticated";

revoke truncate on table "public"."rag_cache_meta" from "authenticated";

revoke update on table "public"."rag_cache_meta" from "authenticated";

revoke delete on table "public"."rag_cache_meta" from "service_role";

revoke insert on table "public"."rag_cache_meta" from "service_role";

revoke references on table "public"."rag_cache_meta" from "service_role";

revoke select on table "public"."rag_cache_meta" from "service_role";

revoke trigger on table "public"."rag_cache_meta" from "service_role";

revoke truncate on table "public"."rag_cache_meta" from "service_role";

revoke update on table "public"."rag_cache_meta" from "service_role";

revoke delete on table "public"."rag_query_cache" from "anon";

revoke insert on table "public"."rag_query_cache" from "anon";

revoke references on table "public"."rag_query_cache" from "anon";

revoke select on table "public"."rag_query_cache" from "anon";

revoke trigger on table "public"."rag_query_cache" from "anon";

revoke truncate on table "public"."rag_query_cache" from "anon";

revoke update on table "public"."rag_query_cache" from "anon";

revoke delete on table "public"."rag_query_cache" from "authenticated";

revoke insert on table "public"."rag_query_cache" from "authenticated";

revoke references on table "public"."rag_query_cache" from "authenticated";

revoke select on table "public"."rag_query_cache" from "authenticated";

revoke trigger on table "public"."rag_query_cache" from "authenticated";

revoke truncate on table "public"."rag_query_cache" from "authenticated";

revoke update on table "public"."rag_query_cache" from "authenticated";

revoke delete on table "public"."rag_query_cache" from "service_role";

revoke insert on table "public"."rag_query_cache" from "service_role";

revoke references on table "public"."rag_query_cache" from "service_role";

revoke select on table "public"."rag_query_cache" from "service_role";

revoke trigger on table "public"."rag_query_cache" from "service_role";

revoke truncate on table "public"."rag_query_cache" from "service_role";

revoke update on table "public"."rag_query_cache" from "service_role";

revoke delete on table "public"."streams" from "anon";

revoke insert on table "public"."streams" from "anon";

revoke references on table "public"."streams" from "anon";

revoke select on table "public"."streams" from "anon";

revoke trigger on table "public"."streams" from "anon";

revoke truncate on table "public"."streams" from "anon";

revoke update on table "public"."streams" from "anon";

revoke delete on table "public"."streams" from "authenticated";

revoke insert on table "public"."streams" from "authenticated";

revoke references on table "public"."streams" from "authenticated";

revoke select on table "public"."streams" from "authenticated";

revoke trigger on table "public"."streams" from "authenticated";

revoke truncate on table "public"."streams" from "authenticated";

revoke update on table "public"."streams" from "authenticated";

revoke delete on table "public"."streams" from "service_role";

revoke insert on table "public"."streams" from "service_role";

revoke references on table "public"."streams" from "service_role";

revoke select on table "public"."streams" from "service_role";

revoke trigger on table "public"."streams" from "service_role";

revoke truncate on table "public"."streams" from "service_role";

revoke update on table "public"."streams" from "service_role";

revoke delete on table "public"."suggestions" from "anon";

revoke insert on table "public"."suggestions" from "anon";

revoke references on table "public"."suggestions" from "anon";

revoke select on table "public"."suggestions" from "anon";

revoke trigger on table "public"."suggestions" from "anon";

revoke truncate on table "public"."suggestions" from "anon";

revoke update on table "public"."suggestions" from "anon";

revoke delete on table "public"."suggestions" from "authenticated";

revoke insert on table "public"."suggestions" from "authenticated";

revoke references on table "public"."suggestions" from "authenticated";

revoke select on table "public"."suggestions" from "authenticated";

revoke trigger on table "public"."suggestions" from "authenticated";

revoke truncate on table "public"."suggestions" from "authenticated";

revoke update on table "public"."suggestions" from "authenticated";

revoke delete on table "public"."suggestions" from "service_role";

revoke insert on table "public"."suggestions" from "service_role";

revoke references on table "public"."suggestions" from "service_role";

revoke select on table "public"."suggestions" from "service_role";

revoke trigger on table "public"."suggestions" from "service_role";

revoke truncate on table "public"."suggestions" from "service_role";

revoke update on table "public"."suggestions" from "service_role";

revoke delete on table "public"."upstash_cache_meta" from "anon";

revoke insert on table "public"."upstash_cache_meta" from "anon";

revoke references on table "public"."upstash_cache_meta" from "anon";

revoke select on table "public"."upstash_cache_meta" from "anon";

revoke trigger on table "public"."upstash_cache_meta" from "anon";

revoke truncate on table "public"."upstash_cache_meta" from "anon";

revoke update on table "public"."upstash_cache_meta" from "anon";

revoke delete on table "public"."upstash_cache_meta" from "authenticated";

revoke insert on table "public"."upstash_cache_meta" from "authenticated";

revoke references on table "public"."upstash_cache_meta" from "authenticated";

revoke select on table "public"."upstash_cache_meta" from "authenticated";

revoke trigger on table "public"."upstash_cache_meta" from "authenticated";

revoke truncate on table "public"."upstash_cache_meta" from "authenticated";

revoke update on table "public"."upstash_cache_meta" from "authenticated";

revoke delete on table "public"."upstash_cache_meta" from "service_role";

revoke insert on table "public"."upstash_cache_meta" from "service_role";

revoke references on table "public"."upstash_cache_meta" from "service_role";

revoke select on table "public"."upstash_cache_meta" from "service_role";

revoke trigger on table "public"."upstash_cache_meta" from "service_role";

revoke truncate on table "public"."upstash_cache_meta" from "service_role";

revoke update on table "public"."upstash_cache_meta" from "service_role";

revoke delete on table "public"."user_query_history" from "anon";

revoke insert on table "public"."user_query_history" from "anon";

revoke references on table "public"."user_query_history" from "anon";

revoke select on table "public"."user_query_history" from "anon";

revoke trigger on table "public"."user_query_history" from "anon";

revoke truncate on table "public"."user_query_history" from "anon";

revoke update on table "public"."user_query_history" from "anon";

revoke delete on table "public"."user_query_history" from "authenticated";

revoke insert on table "public"."user_query_history" from "authenticated";

revoke references on table "public"."user_query_history" from "authenticated";

revoke select on table "public"."user_query_history" from "authenticated";

revoke trigger on table "public"."user_query_history" from "authenticated";

revoke truncate on table "public"."user_query_history" from "authenticated";

revoke update on table "public"."user_query_history" from "authenticated";

revoke delete on table "public"."user_query_history" from "service_role";

revoke insert on table "public"."user_query_history" from "service_role";

revoke references on table "public"."user_query_history" from "service_role";

revoke select on table "public"."user_query_history" from "service_role";

revoke trigger on table "public"."user_query_history" from "service_role";

revoke truncate on table "public"."user_query_history" from "service_role";

revoke update on table "public"."user_query_history" from "service_role";

revoke delete on table "public"."web_indexes" from "anon";

revoke insert on table "public"."web_indexes" from "anon";

revoke references on table "public"."web_indexes" from "anon";

revoke select on table "public"."web_indexes" from "anon";

revoke trigger on table "public"."web_indexes" from "anon";

revoke truncate on table "public"."web_indexes" from "anon";

revoke update on table "public"."web_indexes" from "anon";

revoke delete on table "public"."web_indexes" from "authenticated";

revoke insert on table "public"."web_indexes" from "authenticated";

revoke references on table "public"."web_indexes" from "authenticated";

revoke select on table "public"."web_indexes" from "authenticated";

revoke trigger on table "public"."web_indexes" from "authenticated";

revoke truncate on table "public"."web_indexes" from "authenticated";

revoke update on table "public"."web_indexes" from "authenticated";

revoke delete on table "public"."web_indexes" from "service_role";

revoke insert on table "public"."web_indexes" from "service_role";

revoke references on table "public"."web_indexes" from "service_role";

revoke select on table "public"."web_indexes" from "service_role";

revoke trigger on table "public"."web_indexes" from "service_role";

revoke truncate on table "public"."web_indexes" from "service_role";

revoke update on table "public"."web_indexes" from "service_role";

alter table "public"."Chat" drop constraint "Chat_visibility_check";

alter table "public"."Document" drop constraint "Document_kind_check";

alter table "public"."Document" drop constraint "Document_userId_fkey";

alter table "public"."Suggestion" drop constraint "Suggestion_documentId_documentCreatedAt_fkey";

alter table "public"."Suggestion" drop constraint "Suggestion_userId_fkey";

alter table "public"."User" drop constraint "User_email_key";

alter table "public"."artifacts" drop constraint "artifacts_user_id_fkey";

alter table "public"."chat_sessions" drop constraint "fk_chat_sessions_web_index_id";

alter table "public"."crawl_jobs" drop constraint "crawl_jobs_web_index_id_fkey";

alter table "public"."document_chunks_enhanced" drop constraint "document_chunks_enhanced_document_id_chunk_index_key";

alter table "public"."document_chunks_enhanced" drop constraint "document_chunks_enhanced_document_id_fkey";

alter table "public"."documents" drop constraint "documents_web_index_id_fkey";

alter table "public"."kg_relationships" drop constraint "kg_relationships_source_entity_id_fkey";

alter table "public"."kg_relationships" drop constraint "kg_relationships_target_entity_id_fkey";

alter table "public"."legacy_chats" drop constraint "legacy_chats_user_id_fkey";

alter table "public"."legacy_messages" drop constraint "legacy_messages_chat_id_fkey";

alter table "public"."legacy_messages_v2" drop constraint "legacy_messages_v2_chat_id_fkey";

alter table "public"."legacy_votes" drop constraint "legacy_votes_chat_id_fkey";

alter table "public"."legacy_votes" drop constraint "legacy_votes_message_id_fkey";

alter table "public"."legacy_votes_v2" drop constraint "legacy_votes_v2_chat_id_fkey";

alter table "public"."legacy_votes_v2" drop constraint "legacy_votes_v2_message_id_fkey";

alter table "public"."policy_timeline" drop constraint "policy_timeline_entity_id_fkey";

alter table "public"."streams" drop constraint "streams_chat_id_fkey";

alter table "public"."suggestions" drop constraint "suggestions_document_id_fkey";

alter table "public"."suggestions" drop constraint "suggestions_user_id_fkey";

alter table "public"."upstash_cache_meta" drop constraint "upstash_cache_meta_cache_key_key";

alter table "public"."user_query_history" drop constraint "user_query_history_user_id_fkey";

alter table "public"."web_indexes" drop constraint "web_indexes_user_id_fkey";

alter table "public"."web_indexes" drop constraint "web_indexes_user_id_namespace_key";

alter table "public"."Chat" drop constraint "Chat_userId_fkey";

alter table "public"."Stream" drop constraint "Stream_chatId_fkey";

drop function if exists "public"."cleanup_expired_cache"();

drop function if exists "public"."create_guest_user"();

drop function if exists "public"."get_related_edges"(p_entity_names text[]);

drop function if exists "public"."get_user"(user_email text);

drop function if exists "public"."get_web_index_stats"(p_web_index_id uuid);

drop function if exists "public"."is_admin"();

drop function if exists "public"."match_image_embeddings"(p_query_embedding vector, p_match_count integer);

drop function if exists "public"."search_rag_hybrid"(p_query_embedding vector, p_query_text text, p_match_count integer, p_similarity_threshold double precision);

drop view if exists "public"."unified_chats";

drop view if exists "public"."unified_messages";

alter table "public"."Document" drop constraint "Document_pkey";

alter table "public"."Suggestion" drop constraint "Suggestion_pkey";

alter table "public"."User" drop constraint "User_pkey";

alter table "public"."Vote" drop constraint "Vote_pkey";

alter table "public"."Vote_v2" drop constraint "Vote_v2_pkey";

alter table "public"."artifacts" drop constraint "artifacts_pkey";

alter table "public"."crawl_jobs" drop constraint "crawl_jobs_pkey";

alter table "public"."document_chunks_enhanced" drop constraint "document_chunks_enhanced_pkey";

alter table "public"."image_embeddings" drop constraint "image_embeddings_pkey";

alter table "public"."kg_entities" drop constraint "kg_entities_pkey";

alter table "public"."kg_relationships" drop constraint "kg_relationships_pkey";

alter table "public"."legacy_chats" drop constraint "legacy_chats_pkey";

alter table "public"."legacy_messages" drop constraint "legacy_messages_pkey";

alter table "public"."legacy_messages_v2" drop constraint "legacy_messages_v2_pkey";

alter table "public"."legacy_votes" drop constraint "legacy_votes_chat_id_message_id_pk";

alter table "public"."legacy_votes_v2" drop constraint "legacy_votes_v2_chat_id_message_id_pk";

alter table "public"."policy_timeline" drop constraint "policy_timeline_pkey";

alter table "public"."rag_cache_meta" drop constraint "rag_cache_meta_pkey";

alter table "public"."rag_query_cache" drop constraint "rag_query_cache_pkey";

alter table "public"."streams" drop constraint "streams_pkey";

alter table "public"."suggestions" drop constraint "suggestions_pkey";

alter table "public"."upstash_cache_meta" drop constraint "upstash_cache_meta_pkey";

alter table "public"."user_query_history" drop constraint "user_query_history_pkey";

alter table "public"."web_indexes" drop constraint "web_indexes_pkey";

drop index if exists "public"."Document_pkey";

drop index if exists "public"."Suggestion_pkey";

drop index if exists "public"."User_email_key";

drop index if exists "public"."User_pkey";

drop index if exists "public"."Vote_pkey";

drop index if exists "public"."Vote_v2_pkey";

drop index if exists "public"."artifacts_pkey";

drop index if exists "public"."crawl_jobs_pkey";

drop index if exists "public"."document_chunks_enhanced_document_id_chunk_index_key";

drop index if exists "public"."document_chunks_enhanced_pkey";

drop index if exists "public"."idx_artifacts_user_id";

drop index if exists "public"."idx_chat_created_at";

drop index if exists "public"."idx_chat_sessions_web_index_id";

drop index if exists "public"."idx_chat_user_id";

drop index if exists "public"."idx_chat_visibility";

drop index if exists "public"."idx_chunks_enhanced_embedding";

drop index if exists "public"."idx_crawl_jobs_created_at";

drop index if exists "public"."idx_crawl_jobs_status";

drop index if exists "public"."idx_crawl_jobs_web_index_id";

drop index if exists "public"."idx_document_created_at";

drop index if exists "public"."idx_document_kind";

drop index if exists "public"."idx_document_user_id";

drop index if exists "public"."idx_documents_web_index_id";

drop index if exists "public"."idx_entities_search";

drop index if exists "public"."idx_image_embeddings_vector";

drop index if exists "public"."idx_kg_entities_embedding";

drop index if exists "public"."idx_kg_entities_type";

drop index if exists "public"."idx_kg_relationships_type";

drop index if exists "public"."idx_legacy_chats_user_id";

drop index if exists "public"."idx_legacy_messages_chat_id";

drop index if exists "public"."idx_legacy_messages_v2_chat_id";

drop index if exists "public"."idx_legacy_votes_message_id";

drop index if exists "public"."idx_legacy_votes_v2_message_id";

drop index if exists "public"."idx_message_chat_id";

drop index if exists "public"."idx_message_created_at";

drop index if exists "public"."idx_message_role";

drop index if exists "public"."idx_message_v2_chat_id";

drop index if exists "public"."idx_message_v2_created_at";

drop index if exists "public"."idx_message_v2_role";

drop index if exists "public"."idx_policy_timeline_dates";

drop index if exists "public"."idx_rag_query_cache_hash";

drop index if exists "public"."idx_stream_chat_id";

drop index if exists "public"."idx_stream_created_at";

drop index if exists "public"."idx_streams_chat_id";

drop index if exists "public"."idx_suggestion_created_at";

drop index if exists "public"."idx_suggestion_document";

drop index if exists "public"."idx_suggestion_is_resolved";

drop index if exists "public"."idx_suggestion_user_id";

drop index if exists "public"."idx_suggestions_document_id";

drop index if exists "public"."idx_suggestions_user_id";

drop index if exists "public"."idx_upstash_cache_meta_cache_key";

drop index if exists "public"."idx_upstash_cache_meta_last_accessed";

drop index if exists "public"."idx_upstash_cache_meta_namespace";

drop index if exists "public"."idx_user_email";

drop index if exists "public"."idx_vote_chat_id";

drop index if exists "public"."idx_vote_message_id";

drop index if exists "public"."idx_vote_v2_chat_id";

drop index if exists "public"."idx_vote_v2_message_id";

drop index if exists "public"."idx_web_indexes_is_active";

drop index if exists "public"."idx_web_indexes_namespace";

drop index if exists "public"."idx_web_indexes_url";

drop index if exists "public"."idx_web_indexes_user_id";

drop index if exists "public"."image_embeddings_pkey";

drop index if exists "public"."kg_entities_pkey";

drop index if exists "public"."kg_relationships_pkey";

drop index if exists "public"."legacy_chats_pkey";

drop index if exists "public"."legacy_messages_pkey";

drop index if exists "public"."legacy_messages_v2_pkey";

drop index if exists "public"."legacy_votes_chat_id_message_id_pk";

drop index if exists "public"."legacy_votes_v2_chat_id_message_id_pk";

drop index if exists "public"."policy_timeline_pkey";

drop index if exists "public"."rag_cache_meta_pkey";

drop index if exists "public"."rag_query_cache_pkey";

drop index if exists "public"."streams_pkey";

drop index if exists "public"."suggestions_pkey";

drop index if exists "public"."upstash_cache_meta_cache_key_key";

drop index if exists "public"."upstash_cache_meta_pkey";

drop index if exists "public"."user_query_history_pkey";

drop index if exists "public"."web_indexes_pkey";

drop index if exists "public"."web_indexes_user_id_namespace_key";

drop table "public"."Document";

drop table "public"."Suggestion";

drop table "public"."User";

drop table "public"."artifacts";

drop table "public"."crawl_jobs";

drop table "public"."document_chunks_enhanced";

drop table "public"."image_embeddings";

drop table "public"."kg_entities";

drop table "public"."kg_relationships";

drop table "public"."legacy_chats";

drop table "public"."legacy_messages";

drop table "public"."legacy_messages_v2";

drop table "public"."legacy_votes";

drop table "public"."legacy_votes_v2";

drop table "public"."policy_timeline";

drop table "public"."rag_cache_meta";

drop table "public"."rag_query_cache";

drop table "public"."streams";

drop table "public"."suggestions";

drop table "public"."upstash_cache_meta";

drop table "public"."user_query_history";

drop table "public"."web_indexes";

create table "public"."api_config" (
    "id" integer not null default nextval('api_config_id_seq'::regclass),
    "path" text not null,
    "target_table" text not null,
    "description" text,
    "is_active" boolean default true,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


create table "public"."document_chunks" (
    "id" uuid not null default extensions.gen_random_uuid(),
    "document_id" uuid not null,
    "chunk_index" integer not null,
    "text_content" text not null,
    "embedding" vector(1024),
    "token_count" integer,
    "created_at" timestamp with time zone default now()
);


alter table "public"."document_chunks" enable row level security;

alter table "public"."Chat" alter column "createdAt" drop default;

alter table "public"."Chat" alter column "createdAt" set data type timestamp without time zone using "createdAt"::timestamp without time zone;

alter table "public"."Chat" alter column "id" set default extensions.gen_random_uuid();

alter table "public"."Chat" alter column "visibility" set data type character varying using "visibility"::character varying;

alter table "public"."Message" drop column "content";

alter table "public"."Message" add column "attachments" json not null;

alter table "public"."Message" add column "parts" json not null;

alter table "public"."Message" alter column "createdAt" drop default;

alter table "public"."Message" alter column "createdAt" set data type timestamp without time zone using "createdAt"::timestamp without time zone;

alter table "public"."Message" alter column "id" set default extensions.gen_random_uuid();

alter table "public"."Message" alter column "role" set data type character varying using "role"::character varying;

alter table "public"."Message_v2" alter column "attachments" drop default;

alter table "public"."Message_v2" alter column "attachments" set data type json using "attachments"::json;

alter table "public"."Message_v2" alter column "createdAt" drop default;

alter table "public"."Message_v2" alter column "createdAt" set data type timestamp without time zone using "createdAt"::timestamp without time zone;

alter table "public"."Message_v2" alter column "id" set default extensions.gen_random_uuid();

alter table "public"."Message_v2" alter column "parts" drop default;

alter table "public"."Message_v2" alter column "parts" set data type json using "parts"::json;

alter table "public"."Message_v2" alter column "role" set data type character varying using "role"::character varying;

alter table "public"."Stream" alter column "createdAt" drop default;

alter table "public"."Stream" alter column "createdAt" set data type timestamp without time zone using "createdAt"::timestamp without time zone;

alter table "public"."Stream" alter column "id" set default extensions.gen_random_uuid();

alter table "public"."chat_message_votes" add column "createdAt" timestamp with time zone generated always as (created_at) stored;

alter table "public"."chat_message_votes" add column "isUpvoted" boolean generated always as (is_upvoted) stored;

alter table "public"."chat_message_votes" add column "messageId" uuid generated always as (message_id) stored;

alter table "public"."chat_message_votes" add column "userId" uuid generated always as (user_id) stored;

alter table "public"."chat_messages" add column "createdAt" timestamp with time zone generated always as (created_at) stored;

alter table "public"."chat_messages" add column "sessionId" uuid generated always as (session_id) stored;

alter table "public"."chat_messages" add column "toolCalls" jsonb generated always as (tool_calls) stored;

alter table "public"."chat_messages" add column "updatedAt" timestamp with time zone generated always as (updated_at) stored;

alter table "public"."chat_messages" add column "userId" uuid generated always as (user_id) stored;

alter table "public"."chat_sessions" drop column "web_index_id";

alter table "public"."chat_sessions" add column "agentConfig" jsonb generated always as (agent_config) stored;

alter table "public"."chat_sessions" add column "caseId" uuid generated always as (case_id) stored;

alter table "public"."chat_sessions" add column "createdAt" timestamp with time zone generated always as (created_at) stored;

alter table "public"."chat_sessions" add column "lastMessageAt" timestamp with time zone generated always as (last_message_at) stored;

alter table "public"."chat_sessions" add column "systemPrompt" text generated always as (system_prompt) stored;

alter table "public"."chat_sessions" add column "updatedAt" timestamp with time zone generated always as (updated_at) stored;

alter table "public"."chat_sessions" add column "userId" uuid generated always as (user_id) stored;

alter table "public"."documents" drop column "web_index_id";

alter table "public"."profiles" drop column "country_of_citizenship";

alter table "public"."profiles" alter column "immigration_goals" drop default;

alter table "public"."profiles" alter column "immigration_goals" set data type text using "immigration_goals"::text;

alter sequence "public"."api_config_id_seq" owned by "public"."api_config"."id";

drop type "public"."crawl_status";

CREATE UNIQUE INDEX "Vote_chatId_messageId_pk" ON public."Vote" USING btree ("chatId", "messageId");

CREATE UNIQUE INDEX "Vote_v2_chatId_messageId_pk" ON public."Vote_v2" USING btree ("chatId", "messageId");

CREATE UNIQUE INDEX api_config_path_key ON public.api_config USING btree (path);

CREATE UNIQUE INDEX api_config_pkey ON public.api_config USING btree (id);

CREATE UNIQUE INDEX document_chunks_pkey ON public.document_chunks USING btree (id);

CREATE INDEX idx_chat_userid ON public."Chat" USING btree ("userId");

CREATE INDEX idx_document_chunks_document_id ON public.document_chunks USING btree (document_id);

CREATE INDEX idx_document_chunks_embedding ON public.document_chunks USING ivfflat (embedding vector_cosine_ops) WITH (lists='100');

CREATE INDEX idx_message_chatid ON public."Message" USING btree ("chatId");

CREATE INDEX idx_message_v2_chatid ON public."Message_v2" USING btree ("chatId");

CREATE INDEX idx_stream_chatid ON public."Stream" USING btree ("chatId");

CREATE INDEX idx_vote_messageid ON public."Vote" USING btree ("messageId");

CREATE INDEX idx_vote_v2_messageid ON public."Vote_v2" USING btree ("messageId");

alter table "public"."Vote" add constraint "Vote_chatId_messageId_pk" PRIMARY KEY using index "Vote_chatId_messageId_pk";

alter table "public"."Vote_v2" add constraint "Vote_v2_chatId_messageId_pk" PRIMARY KEY using index "Vote_v2_chatId_messageId_pk";

alter table "public"."api_config" add constraint "api_config_pkey" PRIMARY KEY using index "api_config_pkey";

alter table "public"."document_chunks" add constraint "document_chunks_pkey" PRIMARY KEY using index "document_chunks_pkey";

alter table "public"."api_config" add constraint "api_config_path_key" UNIQUE using index "api_config_path_key";

alter table "public"."document_chunks" add constraint "document_chunks_document_id_fkey" FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE not valid;

alter table "public"."document_chunks" validate constraint "document_chunks_document_id_fkey";

alter table "public"."Chat" add constraint "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."Chat" validate constraint "Chat_userId_fkey";

alter table "public"."Stream" add constraint "Stream_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES chat_sessions(id) ON DELETE CASCADE not valid;

alter table "public"."Stream" validate constraint "Stream_chatId_fkey";

set check_function_bodies = off;

create or replace view "public"."chat_message_votes_camel" as  SELECT chat_message_votes.message_id AS "messageId",
    chat_message_votes.user_id AS "userId",
    chat_message_votes.is_upvoted AS "isUpvoted",
    chat_message_votes.created_at AS "createdAt"
   FROM chat_message_votes;


create or replace view "public"."chat_messages_camel" as  SELECT chat_messages.id,
    chat_messages.session_id AS "sessionId",
    chat_messages.user_id AS "userId",
    chat_messages.role,
    chat_messages.content,
    chat_messages.sources,
    chat_messages.tool_calls AS "toolCalls",
    chat_messages.metadata,
    chat_messages.tokens,
    chat_messages.created_at AS "createdAt",
    chat_messages.updated_at AS "updatedAt"
   FROM chat_messages;


create or replace view "public"."chat_sessions_camel" as  SELECT chat_sessions.id,
    chat_sessions.user_id AS "userId",
    chat_sessions.title,
    chat_sessions.context,
    chat_sessions.prompt,
    chat_sessions.model,
    chat_sessions.system_prompt AS "systemPrompt",
    chat_sessions.agent_config AS "agentConfig",
    chat_sessions.case_id AS "caseId",
    chat_sessions.last_message_at AS "lastMessageAt",
    chat_sessions.metadata,
    chat_sessions.visibility,
    chat_sessions.created_at AS "createdAt",
    chat_sessions.updated_at AS "updatedAt"
   FROM chat_sessions;


CREATE OR REPLACE FUNCTION public.match_document_chunks(query_embedding vector, match_threshold double precision DEFAULT 0.7, match_count integer DEFAULT 5, p_user_id uuid DEFAULT NULL::uuid)
 RETURNS TABLE(id uuid, document_id uuid, text_content text, similarity double precision)
 LANGUAGE plpgsql
 SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
  RETURN QUERY
  SELECT
    dc.id,
    dc.document_id,
    dc.text_content,
    1 - (dc.embedding <=> query_embedding) AS similarity -- Operator assumes types are compatible or search_path helps resolve
  FROM public.document_chunks dc
  JOIN public.documents d ON dc.document_id = d.id
  WHERE (1 - (dc.embedding <=> query_embedding)) > match_threshold
    AND (p_user_id IS NULL OR d.user_id = p_user_id)
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$function$
;

grant delete on table "public"."api_config" to "anon";

grant insert on table "public"."api_config" to "anon";

grant references on table "public"."api_config" to "anon";

grant select on table "public"."api_config" to "anon";

grant trigger on table "public"."api_config" to "anon";

grant truncate on table "public"."api_config" to "anon";

grant update on table "public"."api_config" to "anon";

grant delete on table "public"."api_config" to "authenticated";

grant insert on table "public"."api_config" to "authenticated";

grant references on table "public"."api_config" to "authenticated";

grant select on table "public"."api_config" to "authenticated";

grant trigger on table "public"."api_config" to "authenticated";

grant truncate on table "public"."api_config" to "authenticated";

grant update on table "public"."api_config" to "authenticated";

grant delete on table "public"."api_config" to "service_role";

grant insert on table "public"."api_config" to "service_role";

grant references on table "public"."api_config" to "service_role";

grant select on table "public"."api_config" to "service_role";

grant trigger on table "public"."api_config" to "service_role";

grant truncate on table "public"."api_config" to "service_role";

grant update on table "public"."api_config" to "service_role";

grant delete on table "public"."document_chunks" to "anon";

grant insert on table "public"."document_chunks" to "anon";

grant references on table "public"."document_chunks" to "anon";

grant select on table "public"."document_chunks" to "anon";

grant trigger on table "public"."document_chunks" to "anon";

grant truncate on table "public"."document_chunks" to "anon";

grant update on table "public"."document_chunks" to "anon";

grant delete on table "public"."document_chunks" to "authenticated";

grant insert on table "public"."document_chunks" to "authenticated";

grant references on table "public"."document_chunks" to "authenticated";

grant select on table "public"."document_chunks" to "authenticated";

grant trigger on table "public"."document_chunks" to "authenticated";

grant truncate on table "public"."document_chunks" to "authenticated";

grant update on table "public"."document_chunks" to "authenticated";

grant delete on table "public"."document_chunks" to "service_role";

grant insert on table "public"."document_chunks" to "service_role";

grant references on table "public"."document_chunks" to "service_role";

grant select on table "public"."document_chunks" to "service_role";

grant trigger on table "public"."document_chunks" to "service_role";

grant truncate on table "public"."document_chunks" to "service_role";

grant update on table "public"."document_chunks" to "service_role";

create policy "Users can manage their own legacy chats"
on "public"."Chat"
as permissive
for all
to public
using ((auth.uid() = "userId"));


create policy "Service role can manage all legacy messages"
on "public"."Message"
as permissive
for all
to public
using ((auth.role() = 'service_role'::text));


create policy "Users can access messages in their own legacy chats"
on "public"."Message"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM "Chat" c
  WHERE ((c.id = "Message"."chatId") AND (c."userId" = auth.uid())))));


create policy "Service role can manage all legacy messages_v2"
on "public"."Message_v2"
as permissive
for all
to public
using ((auth.role() = 'service_role'::text));


create policy "Users can access messages_v2 in their own legacy chats"
on "public"."Message_v2"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM "Chat" c
  WHERE ((c.id = "Message_v2"."chatId") AND (c."userId" = auth.uid())))));


create policy "Service role can manage all streams"
on "public"."Stream"
as permissive
for all
to public
using ((auth.role() = 'service_role'::text));


create policy "Users can manage their own streams"
on "public"."Stream"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM chat_sessions cs
  WHERE ((cs.id = "Stream"."chatId") AND (cs.user_id = auth.uid())))));


create policy "Service role can manage all legacy votes"
on "public"."Vote"
as permissive
for all
to public
using ((auth.role() = 'service_role'::text));


create policy "Users can vote on messages in their own legacy chats"
on "public"."Vote"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM "Chat" c
  WHERE ((c.id = "Vote"."chatId") AND (c."userId" = auth.uid())))));


create policy "Service role can manage all legacy votes_v2"
on "public"."Vote_v2"
as permissive
for all
to public
using ((auth.role() = 'service_role'::text));


create policy "Users can vote_v2 on messages in their own legacy chats"
on "public"."Vote_v2"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM "Chat" c
  WHERE ((c.id = "Vote_v2"."chatId") AND (c."userId" = auth.uid())))));


create policy "Service role can access all chunks"
on "public"."document_chunks"
as permissive
for all
to public
using ((auth.role() = 'service_role'::text));


create policy "Users can view chunks for their own documents"
on "public"."document_chunks"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM documents d
  WHERE ((d.id = document_chunks.document_id) AND (d.user_id = auth.uid())))));


create policy "Admin and service_role can manage scrape_configurations"
on "public"."scrape_configurations"
as permissive
for all
to public
using (((auth.role() = 'service_role'::text) OR auth.is_admin()))
with check (((auth.role() = 'service_role'::text) OR auth.is_admin()));


create policy "Admin and service_role can manage scrape_history"
on "public"."scrape_history"
as permissive
for all
to public
using (((auth.role() = 'service_role'::text) OR auth.is_admin()))
with check (((auth.role() = 'service_role'::text) OR auth.is_admin()));


create policy "Admin and service_role can access scraping_logs"
on "public"."scraping_logs"
as permissive
for all
to public
using (((auth.role() = 'service_role'::text) OR auth.is_admin()))
with check (((auth.role() = 'service_role'::text) OR auth.is_admin()));


create policy "Admin users can manage scraping_sources"
on "public"."scraping_sources"
as permissive
for all
to public
using (((auth.role() = 'service_role'::text) OR auth.is_admin()))
with check (((auth.role() = 'service_role'::text) OR auth.is_admin()));


create policy "Admin and service_role can manage source_validations"
on "public"."source_validations"
as permissive
for all
to public
using (((auth.role() = 'service_role'::text) OR auth.is_admin()))
with check (((auth.role() = 'service_role'::text) OR auth.is_admin()));



