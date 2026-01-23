import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, MapPin, Mail, Calendar, Heart, MessageSquare, 
  Users, FileText, GraduationCap, Award, ArrowLeft
} from 'lucide-react';
import { getStoredPosts, getFollows, saveFollows, DOMAINS, ForumPost } from '@/data/forumData';

// Extended user profiles with more details
const USER_PROFILES: Record<string, {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'professor';
  avatar: string;
  title: string;
  institution: string;
  location: string;
  bio: string;
  expertise: string[];
  joinedDate: string;
}> = {
  'student-1': {
    id: 'student-1',
    name: 'Maria Santos',
    email: 'student@archipelago.eu',
    role: 'student',
    avatar: 'MS',
    title: 'MSc Student in Marine Biology',
    institution: 'University of the South Pacific (USP)',
    location: 'Fiji',
    bio: 'Passionate about marine conservation and sustainable development in Pacific Island nations. Currently researching coral reef resilience under climate change.',
    expertise: ['Marine Biology', 'Sustainability', 'Climate Science'],
    joinedDate: '2025-01'
  },
  'professor-1': {
    id: 'professor-1',
    name: 'Dr. Jean Dupont',
    email: 'professor@archipelago.eu',
    role: 'professor',
    avatar: 'JD',
    title: 'Professor of Digital Education',
    institution: 'Université des Antilles (UTT)',
    location: 'Martinique, France',
    bio: 'Leading researcher in digital pedagogy and blended learning approaches for island communities. Project coordinator for ARCHIPELAGO, focusing on bridging educational inequalities in SIDS regions.',
    expertise: ['Digital Education', 'Blended Learning', 'Educational Technology', 'SIDS Development'],
    joinedDate: '2024-06'
  }
};

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { user: currentUser, isAuthenticated } = useAuth();
  const [follows, setFollows] = React.useState<string[]>([]);
  const [posts, setPosts] = React.useState<ForumPost[]>([]);

  const profile = userId ? USER_PROFILES[userId] : null;
  const isOwnProfile = currentUser?.id === userId;

  React.useEffect(() => {
    if (currentUser) {
      setFollows(getFollows(currentUser.id));
    }
    setPosts(getStoredPosts());
  }, [currentUser]);

  const handleFollow = () => {
    if (!currentUser || !userId) return;
    const newFollows = follows.includes(userId)
      ? follows.filter(id => id !== userId)
      : [...follows, userId];
    setFollows(newFollows);
    saveFollows(currentUser.id, newFollows);
  };

  const isFollowing = userId ? follows.includes(userId) : false;

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {language === 'en' ? 'Profile not found' : 'Profil non trouvé'}
            </h1>
            <Button onClick={() => navigate('/exchange')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Back to Exchange' : 'Retour à Exchange'}
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const userPosts = posts.filter(p => p.authorId === userId);
  const totalLikes = userPosts.reduce((acc, p) => acc + p.likes.length, 0);
  const totalApplause = userPosts.reduce((acc, p) => acc + p.applause.length, 0);
  const totalComments = userPosts.reduce((acc, p) => acc + p.comments.length, 0);

  // Count followers (how many users follow this profile)
  const followersCount = Object.keys(USER_PROFILES).filter(uid => {
    const userFollows = getFollows(uid);
    return userFollows.includes(profile.id);
  }).length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow">
        {/* Cover & Profile Header */}
        <div className="bg-gradient-to-r from-primary via-primary/80 to-accent h-48 relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10" />
        </div>
        
        <div className="container mx-auto px-4">
          {/* Profile Card */}
          <div className="relative -mt-20 mb-8">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0 -mt-16 md:-mt-20">
                    <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background shadow-lg">
                      <AvatarFallback className={`text-3xl md:text-4xl font-bold ${
                        profile.role === 'professor' 
                          ? 'bg-gradient-to-br from-primary to-accent text-white' 
                          : 'bg-gradient-to-br from-accent to-primary text-white'
                      }`}>
                        {profile.avatar}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {/* Info */}
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                            {profile.name}
                          </h1>
                          <Badge className={`${
                            profile.role === 'professor' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-accent text-accent-foreground'
                          }`}>
                            {profile.role === 'professor' 
                              ? (language === 'en' ? 'Professor' : 'Professeur')
                              : (language === 'en' ? 'Student' : 'Étudiant')}
                          </Badge>
                        </div>
                        <p className="text-lg text-muted-foreground mb-2">{profile.title}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <GraduationCap className="w-4 h-4" />
                            {profile.institution}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {profile.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {language === 'en' ? 'Joined' : 'Membre depuis'} {profile.joinedDate}
                          </span>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      {isAuthenticated && !isOwnProfile && (
                        <div className="flex gap-2">
                          <Button 
                            onClick={handleFollow}
                            variant={isFollowing ? "outline" : "default"}
                            className={isFollowing ? "" : "bg-primary hover:bg-primary/90"}
                          >
                            <Users className="w-4 h-4 mr-2" />
                            {isFollowing 
                              ? (language === 'en' ? 'Following' : 'Suivi')
                              : (language === 'en' ? 'Follow' : 'Suivre')}
                          </Button>
                          <Button variant="outline">
                            <Mail className="w-4 h-4 mr-2" />
                            {language === 'en' ? 'Message' : 'Message'}
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {/* Bio */}
                    <p className="mt-4 text-foreground">{profile.bio}</p>
                    
                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {profile.expertise.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="bg-muted">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-primary">{userPosts.length}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'en' ? 'Posts' : 'Publications'}
              </div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-primary">{followersCount}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'en' ? 'Followers' : 'Abonnés'}
              </div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-accent">{totalLikes}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'en' ? 'Likes' : 'J\'aimes'}
              </div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-accent">{totalApplause}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'en' ? 'Applause' : 'Applaudissements'}
              </div>
            </Card>
            <Card className="text-center p-4 col-span-2 md:col-span-1">
              <div className="text-2xl font-bold text-primary">{totalComments}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'en' ? 'Comments' : 'Commentaires'}
              </div>
            </Card>
          </div>
          
          {/* Content Tabs */}
          <Tabs defaultValue="posts" className="mb-12">
            <TabsList className="mb-6">
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {language === 'en' ? 'Posts' : 'Publications'}
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                {language === 'en' ? 'Activity' : 'Activité'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts">
              {userPosts.length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground">
                  {language === 'en' ? 'No posts yet' : 'Aucune publication'}
                </Card>
              ) : (
                <div className="space-y-4">
                  {userPosts.map(post => {
                    const domain = DOMAINS.find(d => d.id === post.domain);
                    return (
                      <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => navigate('/exchange')}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge className={`${domain?.color || 'bg-primary'} text-white`}>
                              {language === 'en' ? domain?.labelEn : domain?.labelFr}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                          <p className="text-muted-foreground line-clamp-2">{post.content}</p>
                          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {post.likes.length}
                            </span>
                            <span className="flex items-center gap-1">
                              👏 {post.applause.length}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              {post.comments.length}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="activity">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {language === 'en' 
                          ? `Published ${userPosts.length} posts in the Exchange forum`
                          : `A publié ${userPosts.length} articles dans le forum Exchange`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Active contributor' : 'Contributeur actif'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="p-2 bg-accent/10 rounded-full">
                      <Heart className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {language === 'en' 
                          ? `Received ${totalLikes + totalApplause} reactions`
                          : `A reçu ${totalLikes + totalApplause} réactions`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Community appreciation' : 'Appréciation de la communauté'}
                      </p>
                    </div>
                  </div>
                  {profile.role === 'professor' && (
                    <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {language === 'en' 
                            ? 'ARCHIPELAGO Project Coordinator'
                            : 'Coordinateur du projet ARCHIPELAGO'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' ? 'Leading educational initiatives' : 'Direction des initiatives éducatives'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
