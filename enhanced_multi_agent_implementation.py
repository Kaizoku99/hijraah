#!/usr/bin/env python3
"""
Enhanced Hijraah Multi-Agent System Implementation
This demonstrates advanced multi-agent capabilities for Islamic community services.
"""

import asyncio
import json
import uuid
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from enum import Enum
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class RequestPriority(Enum):
    LOW = 1
    NORMAL = 2
    HIGH = 3
    URGENT = 4

class UserType(Enum):
    NEW_MUSLIM = "new_muslim"
    ESTABLISHED_MUSLIM = "established_muslim"
    COMMUNITY_LEADER = "community_leader"
    SCHOLAR = "scholar"
    VISITOR = "visitor"

@dataclass
class UserProfile:
    """Enhanced user profile with Islamic community context"""
    user_id: str
    user_type: UserType
    language: str = "en"
    location: str = ""
    interests: List[str] = field(default_factory=list)
    community_connections: List[str] = field(default_factory=list)
    religious_knowledge_level: str = "beginner"  # beginner, intermediate, advanced
    financial_status: str = "private"
    migration_status: Optional[str] = None
    created_at: datetime = field(default_factory=datetime.now)
    last_active: datetime = field(default_factory=datetime.now)

@dataclass
class UserRequest:
    """Enhanced user request with context"""
    user_id: str
    request_type: str
    content: str
    language: str = "en"
    priority: RequestPriority = RequestPriority.NORMAL
    context: Dict[str, Any] = field(default_factory=dict)
    user_profile: Optional[UserProfile] = None
    session_id: str = field(default_factory=lambda: str(uuid.uuid4()))

@dataclass
class AgentResponse:
    """Enhanced agent response with metadata"""
    agent_id: str
    agent_type: str
    response: str
    confidence: float
    metadata: Dict[str, Any] = field(default_factory=dict)
    suggested_actions: List[str] = field(default_factory=list)
    follow_up_questions: List[str] = field(default_factory=list)
    timestamp: datetime = field(default_factory=datetime.now)

class EnhancedBaseAgent:
    """Enhanced base agent with advanced capabilities"""
    
    def __init__(self, agent_id: str, agent_type: str):
        self.agent_id = agent_id
        self.agent_type = agent_type
        self.knowledge_base = {}
        self.interaction_history = []
        self.performance_metrics = {
            'total_requests': 0,
            'successful_responses': 0,
            'average_confidence': 0.0,
            'response_times': []
        }
        
    async def process_request(self, request: UserRequest) -> AgentResponse:
        """Process a user request and return a response"""
        start_time = datetime.now()
        
        try:
            response = await self._process_request_impl(request)
            response.timestamp = datetime.now()
            
            # Update performance metrics
            self._update_metrics(request, response, start_time)
            
            # Learn from interaction
            await self.learn_from_interaction(request, response)
            
            return response
            
        except Exception as e:
            logger.error(f"Error in {self.agent_type} agent: {e}")
            return AgentResponse(
                agent_id=self.agent_id,
                agent_type=self.agent_type,
                response=f"I apologize, but I encountered an error processing your request. Please try again.",
                confidence=0.0,
                metadata={'error': str(e)}
            )
    
    async def _process_request_impl(self, request: UserRequest) -> AgentResponse:
        """Implementation specific to each agent"""
        raise NotImplementedError
        
    async def learn_from_interaction(self, request: UserRequest, response: AgentResponse):
        """Learn from user interactions to improve future responses"""
        interaction = {
            'timestamp': datetime.now().isoformat(),
            'request': request.__dict__,
            'response': response.__dict__,
            'user_feedback': None,
            'success_metrics': {
                'response_time': (response.timestamp - datetime.now()).total_seconds(),
                'confidence': response.confidence
            }
        }
        self.interaction_history.append(interaction)
        
        # Keep only recent interactions for memory management
        if len(self.interaction_history) > 1000:
            self.interaction_history = self.interaction_history[-500:]
    
    def _update_metrics(self, request: UserRequest, response: AgentResponse, start_time: datetime):
        """Update performance metrics"""
        self.performance_metrics['total_requests'] += 1
        self.performance_metrics['successful_responses'] += 1
        self.performance_metrics['response_times'].append(
            (datetime.now() - start_time).total_seconds()
        )
        
        # Update average confidence
        total_confidence = sum(self.performance_metrics['response_times'])
        self.performance_metrics['average_confidence'] = total_confidence / len(self.performance_metrics['response_times'])

class EnhancedUserInterfaceAgent(EnhancedBaseAgent):
    """Enhanced user interface agent with advanced intent recognition"""
    
    def __init__(self):
        super().__init__("enhanced_ui_agent", "user_interface")
        self.user_preferences = {}
        self.language_support = ["en", "ar", "ur", "tr", "fr", "de", "es"]
        self.intent_patterns = self._load_intent_patterns()
        
    async def _process_request_impl(self, request: UserRequest) -> AgentResponse:
        # Enhanced intent analysis with user context
        intent_analysis = self._analyze_intent_enhanced(request)
        
        # Personalized welcome message
        welcome_msg = self._generate_personalized_welcome(request, intent_analysis)
        
        # Suggest relevant services
        suggested_services = self._suggest_services(intent_analysis, request.user_profile)
        
        response = f"{welcome_msg}\n\n{suggested_services}"
        
        return AgentResponse(
            agent_id=self.agent_id,
            agent_type=self.agent_type,
            response=response,
            confidence=intent_analysis['confidence'],
            metadata={
                'intent': intent_analysis['primary_intent'],
                'secondary_intents': intent_analysis['secondary_intents'],
                'routing': True,
                'user_context': intent_analysis['user_context']
            },
            suggested_actions=intent_analysis['suggested_actions'],
            follow_up_questions=intent_analysis['follow_up_questions']
        )
    
    def _analyze_intent_enhanced(self, request: UserRequest) -> Dict[str, Any]:
        """Enhanced intent analysis with context"""
        content_lower = request.content.lower()
        user_profile = request.user_profile
        
        # Primary intent detection
        primary_intent = "general_assistance"
        confidence = 0.7
        
        intent_mappings = {
            'prayer_guidance': ['prayer', 'salah', 'namaz', 'wudu', 'ablution'],
            'financial_services': ['zakat', 'charity', 'donation', 'investment', 'banking'],
            'community_services': ['community', 'event', 'gathering', 'volunteer'],
            'migration_support': ['migration', 'visa', 'settlement', 'relocation'],
            'knowledge_resources': ['quran', 'hadith', 'islamic', 'fiqh', 'scholar'],
            'family_support': ['family', 'marriage', 'children', 'parenting'],
            'crisis_support': ['help', 'emergency', 'crisis', 'support', 'assistance']
        }
        
        for intent, keywords in intent_mappings.items():
            if any(keyword in content_lower for keyword in keywords):
                primary_intent = intent
                confidence = 0.9
                break
        
        # Secondary intents
        secondary_intents = []
        for intent, keywords in intent_mappings.items():
            if intent != primary_intent and any(keyword in content_lower for keyword in keywords):
                secondary_intents.append(intent)
        
        # User context analysis
        user_context = self._analyze_user_context(user_profile, content_lower)
        
        # Suggested actions based on intent and user type
        suggested_actions = self._generate_suggested_actions(primary_intent, user_profile)
        
        # Follow-up questions
        follow_up_questions = self._generate_follow_up_questions(primary_intent, user_profile)
        
        return {
            'primary_intent': primary_intent,
            'secondary_intents': secondary_intents,
            'confidence': confidence,
            'user_context': user_context,
            'suggested_actions': suggested_actions,
            'follow_up_questions': follow_up_questions
        }
    
    def _analyze_user_context(self, user_profile: Optional[UserProfile], content: str) -> Dict[str, Any]:
        """Analyze user context for better personalization"""
        context = {
            'user_type': user_profile.user_type if user_profile else UserType.VISITOR,
            'language': user_profile.language if user_profile else "en",
            'knowledge_level': user_profile.religious_knowledge_level if user_profile else "beginner",
            'location': user_profile.location if user_profile else "",
            'interests': user_profile.interests if user_profile else []
        }
        
        # Detect urgency in content
        urgent_keywords = ['emergency', 'urgent', 'help', 'crisis', 'immediate']
        context['urgency'] = any(keyword in content for keyword in urgent_keywords)
        
        return context
    
    def _generate_personalized_welcome(self, request: UserRequest, intent_analysis: Dict[str, Any]) -> str:
        """Generate personalized welcome message"""
        user_profile = request.user_profile
        user_type = user_profile.user_type if user_profile else UserType.VISITOR
        
        greetings = {
            UserType.NEW_MUSLIM: "Assalamu alaikum! Welcome to your journey in Islam.",
            UserType.ESTABLISHED_MUSLIM: "Assalamu alaikum! Welcome back to the Hijraah community.",
            UserType.COMMUNITY_LEADER: "Assalamu alaikum! Thank you for your leadership in our community.",
            UserType.SCHOLAR: "Assalamu alaikum! We appreciate your scholarly guidance.",
            UserType.VISITOR: "Assalamu alaikum! Welcome to Hijraah, your Islamic community platform."
        }
        
        greeting = greetings.get(user_type, greetings[UserType.VISITOR])
        
        if intent_analysis['user_context']['urgency']:
            greeting += " I understand this is urgent. Let me help you quickly."
        
        return greeting
    
    def _suggest_services(self, intent_analysis: Dict[str, Any], user_profile: Optional[UserProfile]) -> str:
        """Suggest relevant services based on intent and user profile"""
        primary_intent = intent_analysis['primary_intent']
        
        service_suggestions = {
            'prayer_guidance': "I can help you with prayer times, guidance, and learning resources.",
            'financial_services': "I can assist with Zakat calculation, Islamic banking, and financial planning.",
            'community_services': "I can help you connect with your community, organize events, and find volunteer opportunities.",
            'migration_support': "I can provide guidance on migration, settlement, and cultural integration.",
            'knowledge_resources': "I can help you access Islamic knowledge, Quranic resources, and scholarly guidance.",
            'family_support': "I can assist with family matters, marriage guidance, and parenting resources.",
            'crisis_support': "I can connect you with immediate support and community resources."
        }
        
        return service_suggestions.get(primary_intent, "I'm here to help you with various Islamic community services.")
    
    def _generate_suggested_actions(self, intent: str, user_profile: Optional[UserProfile]) -> List[str]:
        """Generate suggested actions for the user"""
        actions = []
        
        if intent == 'prayer_guidance':
            actions.extend(['Get prayer times', 'Learn prayer basics', 'Find local mosque'])
        elif intent == 'financial_services':
            actions.extend(['Calculate Zakat', 'Find Islamic banks', 'Get financial advice'])
        elif intent == 'community_services':
            actions.extend(['Find local events', 'Join community groups', 'Volunteer opportunities'])
        
        return actions
    
    def _generate_follow_up_questions(self, intent: str, user_profile: Optional[UserProfile]) -> List[str]:
        """Generate follow-up questions to better understand user needs"""
        questions = []
        
        if intent == 'prayer_guidance':
            questions.extend(['Are you new to prayer?', 'Do you need help with wudu?', 'Would you like prayer times for your location?'])
        elif intent == 'financial_services':
            questions.extend(['Do you need help calculating Zakat?', 'Are you looking for Islamic investment options?', 'Do you need help with Islamic banking?'])
        
        return questions
    
    def _load_intent_patterns(self) -> Dict[str, List[str]]:
        """Load intent recognition patterns"""
        return {
            'prayer_guidance': ['prayer', 'salah', 'namaz', 'wudu', 'ablution', 'fajr', 'dhuhr', 'asr', 'maghrib', 'isha'],
            'financial_services': ['zakat', 'charity', 'donation', 'investment', 'banking', 'finance', 'money', 'wealth'],
            'community_services': ['community', 'event', 'gathering', 'volunteer', 'group', 'meeting'],
            'migration_support': ['migration', 'visa', 'settlement', 'relocation', 'immigration', 'new country'],
            'knowledge_resources': ['quran', 'hadith', 'islamic', 'fiqh', 'scholar', 'learning', 'education'],
            'family_support': ['family', 'marriage', 'children', 'parenting', 'relationship'],
            'crisis_support': ['help', 'emergency', 'crisis', 'support', 'assistance', 'urgent']
        }

class EnhancedKnowledgeAgent(EnhancedBaseAgent):
    """Enhanced knowledge agent with comprehensive Islamic resources"""
    
    def __init__(self):
        super().__init__("enhanced_knowledge_agent", "knowledge_management")
        self.islamic_resources = self._load_islamic_resources()
        self.scholarly_sources = self._load_scholarly_sources()
        
    async def _process_request_impl(self, request: UserRequest) -> AgentResponse:
        # Enhanced knowledge retrieval with user context
        knowledge_response = self._retrieve_enhanced_knowledge(request)
        
        # Add relevant references and sources
        references = self._get_relevant_references(request.content, request.user_profile)
        
        response_text = f"{knowledge_response['content']}\n\n"
        if references:
            response_text += f"References: {references}"
        
        return AgentResponse(
            agent_id=self.agent_id,
            agent_type=self.agent_type,
            response=response_text,
            confidence=knowledge_response['confidence'],
            metadata={
                'knowledge_type': knowledge_response['type'],
                'sources': knowledge_response['sources'],
                'user_level': request.user_profile.religious_knowledge_level if request.user_profile else 'beginner'
            },
            suggested_actions=knowledge_response['suggested_actions'],
            follow_up_questions=knowledge_response['follow_up_questions']
        )
    
    def _retrieve_enhanced_knowledge(self, request: UserRequest) -> Dict[str, Any]:
        """Retrieve enhanced knowledge based on user context"""
        content_lower = request.content.lower()
        user_profile = request.user_profile
        knowledge_level = user_profile.religious_knowledge_level if user_profile else 'beginner'
        
        # Determine knowledge type and content
        if any(word in content_lower for word in ['prayer', 'salah', 'namaz']):
            return self._get_prayer_knowledge(knowledge_level)
        elif any(word in content_lower for word in ['quran', 'holy book']):
            return self._get_quran_knowledge(knowledge_level)
        elif any(word in content_lower for word in ['hadith', 'prophet']):
            return self._get_hadith_knowledge(knowledge_level)
        elif any(word in content_lower for word in ['fiqh', 'ruling', 'halal', 'haram']):
            return self._get_fiqh_knowledge(knowledge_level)
        else:
            return self._get_general_islamic_knowledge(knowledge_level)
    
    def _get_prayer_knowledge(self, level: str) -> Dict[str, Any]:
        """Get prayer-related knowledge based on user level"""
        if level == 'beginner':
            content = "The five daily prayers (Salah) are: Fajr (dawn), Dhuhr (noon), Asr (afternoon), Maghrib (sunset), and Isha (night). Each prayer has specific times and requirements."
            actions = ['Learn prayer times', 'Practice prayer movements', 'Find prayer guidance videos']
            questions = ['Would you like to learn the prayer times for your location?', 'Do you need help with wudu (ablution)?']
        else:
            content = "Prayer (Salah) is one of the five pillars of Islam. It includes specific movements, recitations, and spiritual focus. The prayer times are based on the sun's position and vary by location."
            actions = ['Get detailed prayer guidance', 'Learn about prayer variations', 'Find scholarly resources']
            questions = ['Are you interested in learning about prayer variations?', 'Would you like scholarly resources on prayer?']
        
        return {
            'content': content,
            'confidence': 0.95,
            'type': 'prayer_guidance',
            'sources': ['Quran', 'Hadith collections', 'Islamic scholars'],
            'suggested_actions': actions,
            'follow_up_questions': questions
        }
    
    def _get_quran_knowledge(self, level: str) -> Dict[str, Any]:
        """Get Quran-related knowledge"""
        if level == 'beginner':
            content = "The Quran is the holy book of Islam, revealed to Prophet Muhammad (PBUH) over 23 years. It contains 114 chapters (surahs) and provides guidance for all aspects of life."
            actions = ['Read Quran translations', 'Learn about Quranic themes', 'Find recitation resources']
            questions = ['Would you like to start reading the Quran?', 'Are you interested in Quranic recitation?']
        else:
            content = "The Quran is the final revelation from Allah, containing divine guidance, stories of previous prophets, and comprehensive teachings for humanity. It addresses theology, law, ethics, and spirituality."
            actions = ['Study Quranic tafsir', 'Learn Quranic sciences', 'Join Quran study groups']
            questions = ['Are you interested in studying Quranic interpretation?', 'Would you like to learn about Quranic sciences?']
        
        return {
            'content': content,
            'confidence': 0.98,
            'type': 'quran_knowledge',
            'sources': ['Quran', 'Tafsir literature', 'Islamic scholars'],
            'suggested_actions': actions,
            'follow_up_questions': questions
        }
    
    def _get_hadith_knowledge(self, level: str) -> Dict[str, Any]:
        """Get Hadith-related knowledge"""
        if level == 'beginner':
            content = "Hadith are the sayings, actions, and approvals of Prophet Muhammad (PBUH). They provide practical guidance on how to implement Islamic teachings in daily life."
            actions = ['Read authentic Hadith', 'Learn about Hadith sciences', 'Find Hadith collections']
            questions = ['Would you like to start reading Hadith?', 'Are you interested in learning about Hadith authentication?']
        else:
            content = "Hadith literature includes the sayings and actions of Prophet Muhammad (PBUH), carefully preserved and transmitted through reliable chains of narrators. They complement the Quran and provide detailed guidance."
            actions = ['Study Hadith sciences', 'Learn about narrators', 'Access scholarly Hadith resources']
            questions = ['Are you interested in studying Hadith sciences?', 'Would you like to learn about Hadith narrators?']
        
        return {
            'content': content,
            'confidence': 0.92,
            'type': 'hadith_knowledge',
            'sources': ['Hadith collections', 'Hadith scholars', 'Authentication literature'],
            'suggested_actions': actions,
            'follow_up_questions': questions
        }
    
    def _get_fiqh_knowledge(self, level: str) -> Dict[str, Any]:
        """Get Fiqh-related knowledge"""
        if level == 'beginner':
            content = "Fiqh is Islamic jurisprudence - the understanding and application of Islamic law. It helps Muslims understand what is halal (permissible) and haram (forbidden) in various situations."
            actions = ['Learn basic Islamic rulings', 'Find Fiqh resources', 'Consult with scholars']
            questions = ['Do you have specific questions about Islamic rulings?', 'Would you like to learn about different schools of thought?']
        else:
            content = "Fiqh encompasses the detailed understanding and application of Islamic law derived from the Quran and Hadith. Different schools of thought (madhabs) provide various interpretations and methodologies."
            actions = ['Study Fiqh methodology', 'Learn about different madhabs', 'Access scholarly Fiqh resources']
            questions = ['Are you interested in studying Fiqh methodology?', 'Would you like to learn about different Islamic schools of thought?']
        
        return {
            'content': content,
            'confidence': 0.88,
            'type': 'fiqh_knowledge',
            'sources': ['Fiqh literature', 'Islamic scholars', 'Legal texts'],
            'suggested_actions': actions,
            'follow_up_questions': questions
        }
    
    def _get_general_islamic_knowledge(self, level: str) -> Dict[str, Any]:
        """Get general Islamic knowledge"""
        content = "Islam is a comprehensive way of life that guides Muslims in all aspects of their existence. It provides guidance on worship, social interactions, business, family life, and personal development."
        actions = ['Learn about Islamic basics', 'Find educational resources', 'Connect with scholars']
        questions = ['What specific aspect of Islam would you like to learn about?', 'Are you looking for beginner-friendly resources?']
        
        return {
            'content': content,
            'confidence': 0.85,
            'type': 'general_islamic_knowledge',
            'sources': ['Quran', 'Hadith', 'Islamic scholars', 'Educational resources'],
            'suggested_actions': actions,
            'follow_up_questions': questions
        }
    
    def _get_relevant_references(self, content: str, user_profile: Optional[UserProfile]) -> str:
        """Get relevant references for the knowledge provided"""
        # This would connect to actual Islamic databases and scholarly sources
        return "References available from authenticated Islamic sources and scholarly works."
    
    def _load_islamic_resources(self) -> Dict[str, Any]:
        """Load comprehensive Islamic resources"""
        return {
            'prayer_resources': {'status': 'loaded'},
            'quran_resources': {'status': 'loaded'},
            'hadith_resources': {'status': 'loaded'},
            'fiqh_resources': {'status': 'loaded'},
            'scholarly_resources': {'status': 'loaded'}
        }
    
    def _load_scholarly_sources(self) -> Dict[str, Any]:
        """Load scholarly sources and references"""
        return {
            'scholars': {'status': 'loaded'},
            'publications': {'status': 'loaded'},
            'research': {'status': 'loaded'}
        }

class EnhancedCoordinatorAgent:
    """Enhanced coordinator agent with advanced workflow management"""
    
    def __init__(self):
        self.agents = {
            'ui': EnhancedUserInterfaceAgent(),
            'knowledge': EnhancedKnowledgeAgent(),
            # Add other enhanced agents here
        }
        self.conversation_history = []
        self.workflow_patterns = self._load_workflow_patterns()
        self.performance_metrics = {
            'total_conversations': 0,
            'average_response_time': 0.0,
            'user_satisfaction': 0.0
        }
    
    async def process_user_request(self, request: UserRequest) -> List[AgentResponse]:
        """Process a user request through the enhanced multi-agent system"""
        start_time = datetime.now()
        
        try:
            responses = []
            
            # 1. Enhanced User Interface Agent analyzes intent and context
            ui_response = await self.agents['ui'].process_request(request)
            responses.append(ui_response)
            
            # 2. Route to relevant specialized agents based on enhanced intent analysis
            intent_analysis = ui_response.metadata
            primary_intent = intent_analysis.get('intent', 'general')
            
            # Enhanced routing logic
            if 'prayer' in primary_intent or 'islamic' in primary_intent or 'knowledge' in primary_intent:
                knowledge_response = await self.agents['knowledge'].process_request(request)
                responses.append(knowledge_response)
            
            # Add other agent routing logic here
            
            # 3. Generate coordinated response
            coordinated_response = self._generate_coordinated_response(responses, request)
            
            # 4. Update conversation history and metrics
            self._update_conversation_history(request, responses, start_time)
            
            return responses
            
        except Exception as e:
            logger.error(f"Error in coordinator: {e}")
            return [AgentResponse(
                agent_id="coordinator",
                agent_type="coordinator",
                response="I apologize, but I encountered an error. Please try again.",
                confidence=0.0,
                metadata={'error': str(e)}
            )]
    
    def _generate_coordinated_response(self, responses: List[AgentResponse], request: UserRequest) -> str:
        """Generate a coordinated response from multiple agents"""
        # Combine responses intelligently
        combined_response = ""
        suggested_actions = []
        follow_up_questions = []
        
        for response in responses:
            if response.response:
                combined_response += f"{response.response}\n\n"
            suggested_actions.extend(response.suggested_actions)
            follow_up_questions.extend(response.follow_up_questions)
        
        return combined_response.strip()
    
    def _update_conversation_history(self, request: UserRequest, responses: List[AgentResponse], start_time: datetime):
        """Update conversation history and performance metrics"""
        conversation = {
            'timestamp': datetime.now().isoformat(),
            'request': request.__dict__,
            'responses': [r.__dict__ for r in responses],
            'processing_time': (datetime.now() - start_time).total_seconds(),
            'agents_involved': len(responses)
        }
        
        self.conversation_history.append(conversation)
        self.performance_metrics['total_conversations'] += 1
        
        # Keep conversation history manageable
        if len(self.conversation_history) > 10000:
            self.conversation_history = self.conversation_history[-5000:]
    
    def _load_workflow_patterns(self) -> Dict[str, Any]:
        """Load workflow patterns for different types of requests"""
        return {
            'prayer_guidance': ['ui', 'knowledge'],
            'financial_services': ['ui', 'financial'],
            'community_services': ['ui', 'community'],
            'migration_support': ['ui', 'migration'],
            'crisis_support': ['ui', 'community', 'knowledge']
        }

async def demo_enhanced_multi_agent_system():
    """Demonstrate the enhanced multi-agent system"""
    print("🕌 Enhanced Hijraah Multi-Agent System Demo")
    print("=" * 60)
    
    coordinator = EnhancedCoordinatorAgent()
    
    # Create sample user profiles
    user_profiles = {
        'new_muslim': UserProfile(
            user_id="user_001",
            user_type=UserType.NEW_MUSLIM,
            language="en",
            location="New York, USA",
            interests=["prayer", "quran", "community"],
            religious_knowledge_level="beginner"
        ),
        'community_leader': UserProfile(
            user_id="user_002",
            user_type=UserType.COMMUNITY_LEADER,
            language="en",
            location="London, UK",
            interests=["community", "events", "leadership"],
            religious_knowledge_level="advanced"
        )
    }
    
    # Enhanced demo scenarios
    scenarios = [
        {
            "user_id": "user_001",
            "request_type": "prayer_guidance",
            "content": "I'm new to Islam and need help learning how to pray",
            "language": "en",
            "user_profile": user_profiles['new_muslim']
        },
        {
            "user_id": "user_002",
            "request_type": "community_leadership",
            "content": "I want to organize an Islamic education program for our community",
            "language": "en",
            "user_profile": user_profiles['community_leader']
        }
    ]
    
    for i, scenario in enumerate(scenarios, 1):
        print(f"\n📋 Enhanced Scenario {i}: {scenario['request_type'].replace('_', ' ').title()}")
        print("-" * 50)
        
        request = UserRequest(**scenario)
        print(f"👤 User Type: {request.user_profile.user_type.value}")
        print(f"📝 Request: {request.content}")
        print(f"🌍 Language: {request.language}")
        print(f"📍 Location: {request.user_profile.location}")
        
        responses = await coordinator.process_user_request(request)
        
        print("\n🤖 Enhanced Agent Responses:")
        for response in responses:
            print(f"  • {response.agent_type.title()}:")
            print(f"    Response: {response.response[:100]}...")
            print(f"    Confidence: {response.confidence:.2f}")
            if response.suggested_actions:
                print(f"    Suggested Actions: {', '.join(response.suggested_actions[:3])}")
            if response.follow_up_questions:
                print(f"    Follow-up Questions: {', '.join(response.follow_up_questions[:2])}")
        
        print(f"\n📊 Agents Involved: {len(responses)}")
        print("=" * 60)
    
    # Show enhanced system analytics
    print(f"\n📈 Enhanced System Analytics:")
    print(f"  • Total Conversations: {coordinator.performance_metrics['total_conversations']}")
    print(f"  • Available Agents: {len(coordinator.agents)}")
    print(f"  • Conversation History: {len(coordinator.conversation_history)} entries")
    print(f"  • System Status: Enhanced and Operational")

if __name__ == "__main__":
    asyncio.run(demo_enhanced_multi_agent_system())