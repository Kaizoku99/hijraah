"""
Supabase Tools for Hijraah MAS.

This module provides tools for Agno agents to interact with Hijraah's Supabase database,
including user profiles, immigration policies, community data, and knowledge base access.
"""

from typing import Dict, Any, List, Optional, Union
from agno.tools import tool
from supabase import create_client, Client
from datetime import datetime
import json
import logging

logger = logging.getLogger(__name__)


class SupabaseTools:
    """
    Supabase integration tools for Hijraah MAS agents.
    
    Provides access to:
    - User profiles and cases
    - Immigration policies and requirements
    - Community experiences and validation
    - Knowledge base and vector search
    - Analytics and metrics
    """
    
    def __init__(self, url: str, key: str):
        """
        Initialize Supabase tools.
        
        Args:
            url: Supabase project URL
            key: Supabase service role key
        """
        self.supabase: Client = create_client(url, key)
    
    @tool(
        name="get_user_profile",
        description="Retrieve user profile from Supabase database",
        show_result=True
    )
    def get_user_profile(self, user_id: str) -> Dict[str, Any]:
        """
        Retrieve user profile from Supabase.
        
        Args:
            user_id: User ID to retrieve profile for
            
        Returns:
            User profile data or error information
        """
        try:
            response = self.supabase.table('user_profiles').select('*').eq('id', user_id).execute()
            
            if response.data:
                profile = response.data[0]
                logger.info(f"Retrieved profile for user {user_id}")
                return {
                    "success": True,
                    "profile": profile,
                    "retrieved_at": datetime.now().isoformat(),
                }
            else:
                logger.warning(f"No profile found for user {user_id}")
                return {
                    "success": False,
                    "error": "User profile not found",
                    "user_id": user_id,
                }
                
        except Exception as e:
            logger.error(f"Error retrieving user profile {user_id}: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "user_id": user_id,
            }
    
    @tool(
        name="get_policy_data",
        description="Get immigration policy data for specific country and visa type",
        show_result=True
    )
    def get_policy_data(self, country: str, visa_type: Optional[str] = None) -> List[Dict[str, Any]]:
        """
        Get immigration policy data for specific country and visa type.
        
        Args:
            country: Country code or name
            visa_type: Specific visa type (optional)
            
        Returns:
            List of policy documents and requirements
        """
        try:
            query = self.supabase.table('immigration_policies').select('*').eq('country', country)
            
            if visa_type:
                query = query.eq('visa_type', visa_type)
            
            response = query.execute()
            
            logger.info(f"Retrieved {len(response.data)} policy documents for {country}" + 
                       (f" ({visa_type})" if visa_type else ""))
            
            return {
                "success": True,
                "policies": response.data,
                "country": country,
                "visa_type": visa_type,
                "count": len(response.data),
                "retrieved_at": datetime.now().isoformat(),
            }
            
        except Exception as e:
            logger.error(f"Error retrieving policy data for {country}: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "country": country,
                "visa_type": visa_type,
            }
    
    def get_recent_policy_changes(self, country: Optional[str] = None, days: int = 30) -> List[Dict[str, Any]]:
        """
        Get recent policy changes within specified timeframe.
        
        Args:
            country: Specific country to filter by (optional)
            days: Number of days to look back
            
        Returns:
            List of recent policy changes
        """
        try:
            cutoff_date = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
            cutoff_date = cutoff_date.replace(day=cutoff_date.day - days)
            
            query = (self.supabase.table('policy_changes')
                    .select('*')
                    .gte('created_at', cutoff_date.isoformat()))
            
            if country:
                query = query.eq('country', country)
            
            response = query.order('created_at', desc=True).execute()
            
            logger.info(f"Retrieved {len(response.data)} recent policy changes" + 
                       (f" for {country}" if country else ""))
            
            return {
                "success": True,
                "changes": response.data,
                "country": country,
                "days_back": days,
                "count": len(response.data),
                "retrieved_at": datetime.now().isoformat(),
            }
            
        except Exception as e:
            logger.error(f"Error retrieving recent policy changes: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "country": country,
                "days_back": days,
            }
    
    def update_user_case_status(self, user_id: str, status: str, notes: str) -> bool:
        """
        Update user's case status and add notes.
        
        Args:
            user_id: User ID
            status: New status
            notes: Status update notes
            
        Returns:
            Success status
        """
        try:
            response = (self.supabase.table('user_cases')
                       .update({
                           'status': status,
                           'notes': notes,
                           'updated_at': datetime.now().isoformat()
                       })
                       .eq('user_id', user_id)
                       .execute())
            
            logger.info(f"Updated case status for user {user_id} to {status}")
            
            return {
                "success": True,
                "user_id": user_id,
                "status": status,
                "updated_at": datetime.now().isoformat(),
            }
            
        except Exception as e:
            logger.error(f"Error updating case status for user {user_id}: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "user_id": user_id,
            }
    
    def get_community_experiences(self, pathway: str, country: Optional[str] = None) -> List[Dict[str, Any]]:
        """
        Get community experiences for a specific immigration pathway.
        
        Args:
            pathway: Immigration pathway or visa type
            country: Target country (optional)
            
        Returns:
            List of community experiences
        """
        try:
            query = (self.supabase.table('community_experiences')
                    .select('*')
                    .eq('pathway', pathway))
            
            if country:
                query = query.eq('target_country', country)
            
            response = query.order('created_at', desc=True).execute()
            
            logger.info(f"Retrieved {len(response.data)} community experiences for {pathway}")
            
            return {
                "success": True,
                "experiences": response.data,
                "pathway": pathway,
                "country": country,
                "count": len(response.data),
                "retrieved_at": datetime.now().isoformat(),
            }
            
        except Exception as e:
            logger.error(f"Error retrieving community experiences: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "pathway": pathway,
                "country": country,
            }
    
    def store_agent_interaction(self, user_id: str, agent_name: str, query: str, response: str, metadata: Optional[Dict[str, Any]] = None) -> bool:
        """
        Store agent interaction for analytics and improvement.
        
        Args:
            user_id: User ID
            agent_name: Name of the agent
            query: User query
            response: Agent response
            metadata: Additional metadata
            
        Returns:
            Success status
        """
        try:
            interaction_data = {
                'user_id': user_id,
                'agent_name': agent_name,
                'query': query,
                'response': response,
                'metadata': metadata or {},
                'created_at': datetime.now().isoformat(),
            }
            
            response = (self.supabase.table('agent_interactions')
                       .insert(interaction_data)
                       .execute())
            
            logger.info(f"Stored interaction for user {user_id} with agent {agent_name}")
            
            return {
                "success": True,
                "interaction_id": response.data[0]['id'] if response.data else None,
                "stored_at": datetime.now().isoformat(),
            }
            
        except Exception as e:
            logger.error(f"Error storing agent interaction: {str(e)}")
            return {
                "success": False,
                "error": str(e),
            }
    
    def get_success_statistics(self, pathway: str, user_profile: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Get success statistics for an immigration pathway.
        
        Args:
            pathway: Immigration pathway
            user_profile: User profile for personalized statistics
            
        Returns:
            Success statistics and trends
        """
        try:
            # Base query for pathway statistics
            query = (self.supabase.table('immigration_outcomes')
                    .select('*')
                    .eq('pathway', pathway))
            
            # Add profile-based filtering if provided
            if user_profile:
                if 'country_of_origin' in user_profile:
                    query = query.eq('origin_country', user_profile['country_of_origin'])
                if 'education_level' in user_profile:
                    query = query.eq('education_level', user_profile['education_level'])
            
            response = query.execute()
            
            # Calculate statistics
            total_cases = len(response.data)
            successful_cases = len([case for case in response.data if case.get('success', False)])
            success_rate = (successful_cases / total_cases * 100) if total_cases > 0 else 0
            
            # Calculate average timeline
            timelines = [case.get('timeline_days', 0) for case in response.data if case.get('timeline_days')]
            avg_timeline = sum(timelines) / len(timelines) if timelines else 0
            
            logger.info(f"Retrieved success statistics for {pathway}: {success_rate:.1f}% success rate")
            
            return {
                "success": True,
                "pathway": pathway,
                "statistics": {
                    "total_cases": total_cases,
                    "successful_cases": successful_cases,
                    "success_rate": round(success_rate, 1),
                    "average_timeline_days": round(avg_timeline, 0),
                    "sample_size": total_cases,
                },
                "user_profile_matched": user_profile is not None,
                "retrieved_at": datetime.now().isoformat(),
            }
            
        except Exception as e:
            logger.error(f"Error retrieving success statistics: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "pathway": pathway,
            }
    
    def search_knowledge_base(self, query: str, limit: int = 10) -> List[Dict[str, Any]]:
        """
        Search the immigration knowledge base.
        
        Args:
            query: Search query
            limit: Maximum number of results
            
        Returns:
            Search results from knowledge base
        """
        try:
            # Use Supabase's full-text search or vector search if available
            response = (self.supabase.table('knowledge_base')
                       .select('*')
                       .text_search('content', query)
                       .limit(limit)
                       .execute())
            
            logger.info(f"Knowledge base search for '{query}' returned {len(response.data)} results")
            
            return {
                "success": True,
                "query": query,
                "results": response.data,
                "count": len(response.data),
                "searched_at": datetime.now().isoformat(),
            }
            
        except Exception as e:
            logger.error(f"Error searching knowledge base: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "query": query,
            }
    
    def log_policy_change(self, country: str, change_type: str, description: str, impact_level: str, source_url: Optional[str] = None) -> bool:
        """
        Log a detected policy change.
        
        Args:
            country: Country where policy changed
            change_type: Type of change (new, amendment, clarification, etc.)
            description: Description of the change
            impact_level: Impact level (critical, major, minor, informational)
            source_url: URL of the official source
            
        Returns:
            Success status
        """
        try:
            change_data = {
                'country': country,
                'change_type': change_type,
                'description': description,
                'impact_level': impact_level,
                'source_url': source_url,
                'detected_at': datetime.now().isoformat(),
                'status': 'pending_review',
            }
            
            response = (self.supabase.table('policy_changes')
                       .insert(change_data)
                       .execute())
            
            logger.info(f"Logged policy change for {country}: {change_type}")
            
            return {
                "success": True,
                "change_id": response.data[0]['id'] if response.data else None,
                "logged_at": datetime.now().isoformat(),
            }
            
        except Exception as e:
            logger.error(f"Error logging policy change: {str(e)}")
            return {
                "success": False,
                "error": str(e),
            }
    
    def get_user_notifications(self, user_id: str, unread_only: bool = True) -> List[Dict[str, Any]]:
        """
        Get notifications for a specific user.
        
        Args:
            user_id: User ID
            unread_only: Whether to return only unread notifications
            
        Returns:
            List of user notifications
        """
        try:
            query = (self.supabase.table('user_notifications')
                    .select('*')
                    .eq('user_id', user_id))
            
            if unread_only:
                query = query.eq('read', False)
            
            response = query.order('created_at', desc=True).execute()
            
            logger.info(f"Retrieved {len(response.data)} notifications for user {user_id}")
            
            return {
                "success": True,
                "notifications": response.data,
                "user_id": user_id,
                "unread_only": unread_only,
                "count": len(response.data),
                "retrieved_at": datetime.now().isoformat(),
            }
            
        except Exception as e:
            logger.error(f"Error retrieving notifications for user {user_id}: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "user_id": user_id,
            }