import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, HandMetal, MessageCircle, UserPlus, UserMinus, Send, Plus, Filter } from 'lucide-react';
import { 
  ForumPost, 
  Domain, 
  DOMAINS, 
  getStoredPosts, 
  savePosts, 
  getFollows, 
  saveFollows 
} from '@/data/forumData';
import { formatDistanceToNow } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

const Exchange = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { language, t } = useLanguage();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [follows, setFollows] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'all'>('all');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostDomain, setNewPostDomain] = useState<Domain>('digital-education');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    setPosts(getStoredPosts());
  }, []);

  useEffect(() => {
    if (user) {
      setFollows(getFollows(user.id));
    }
  }, [user]);

  const handleToggleLike = (postId: string) => {
    if (!user) return;
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const hasLiked = post.likes.includes(user.id);
        return {
          ...post,
          likes: hasLiked 
            ? post.likes.filter(id => id !== user.id)
            : [...post.likes, user.id]
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  const handleToggleApplause = (postId: string) => {
    if (!user) return;
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const hasApplauded = post.applause.includes(user.id);
        return {
          ...post,
          applause: hasApplauded 
            ? post.applause.filter(id => id !== user.id)
            : [...post.applause, user.id]
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  const handleToggleFollow = (authorId: string) => {
    if (!user) return;
    const isFollowing = follows.includes(authorId);
    const newFollows = isFollowing 
      ? follows.filter(id => id !== authorId)
      : [...follows, authorId];
    setFollows(newFollows);
    saveFollows(user.id, newFollows);
  };

  const handleAddComment = (postId: string) => {
    if (!user || user.role !== 'professor') return;
    const content = commentInputs[postId]?.trim();
    if (!content) return;

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `comment-${Date.now()}`,
              authorId: user.id,
              authorName: user.name,
              authorRole: user.role,
              authorAvatar: user.avatar,
              content,
              createdAt: new Date()
            }
          ]
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    savePosts(updatedPosts);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const handleCreatePost = () => {
    if (!user || user.role !== 'professor') return;
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      authorId: user.id,
      authorName: user.name,
      authorRole: user.role,
      authorAvatar: user.avatar,
      domain: newPostDomain,
      title: newPostTitle.trim(),
      content: newPostContent.trim(),
      createdAt: new Date(),
      likes: [],
      applause: [],
      comments: []
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    savePosts(updatedPosts);
    setShowNewPost(false);
    setNewPostTitle('');
    setNewPostContent('');
  };

  const filteredPosts = selectedDomain === 'all' 
    ? posts 
    : posts.filter(post => post.domain === selectedDomain);

  const sortedPosts = [...filteredPosts].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  const getDomainLabel = (domain: Domain) => {
    const d = DOMAINS.find(dm => dm.id === domain);
    return language === 'en' ? d?.labelEn : d?.labelFr;
  };

  const getDomainColor = (domain: Domain) => {
    return DOMAINS.find(dm => dm.id === domain)?.color || 'bg-muted';
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <h2 className="text-xl font-semibold mb-2">
                {language === 'en' ? 'Sign in to access the Exchange' : 'Connectez-vous pour accéder à l\'échange'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'en' 
                  ? 'Please sign in to view and participate in the forum.' 
                  : 'Veuillez vous connecter pour voir et participer au forum.'}
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {language === 'en' ? 'Knowledge Exchange' : 'Échange de Connaissances'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Share insights and collaborate with the ARCHIPELAGO community'
                : 'Partagez vos idées et collaborez avec la communauté ARCHIPELAGO'}
            </p>
          </div>

          {/* Filters & New Post */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedDomain} onValueChange={(v) => setSelectedDomain(v as Domain | 'all')}>
                <SelectTrigger className="w-[200px] bg-card border-border">
                  <SelectValue placeholder={language === 'en' ? 'All Domains' : 'Tous les domaines'} />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">
                    {language === 'en' ? 'All Domains' : 'Tous les domaines'}
                  </SelectItem>
                  {DOMAINS.map(domain => (
                    <SelectItem key={domain.id} value={domain.id}>
                      {language === 'en' ? domain.labelEn : domain.labelFr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {user?.role === 'professor' && (
              <Button 
                onClick={() => setShowNewPost(!showNewPost)}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                {language === 'en' ? 'New Post' : 'Nouveau Post'}
              </Button>
            )}
          </div>

          {/* New Post Form */}
          {showNewPost && user?.role === 'professor' && (
            <Card className="mb-6 border-primary/30">
              <CardContent className="pt-6 space-y-4">
                <Input
                  placeholder={language === 'en' ? 'Post title...' : 'Titre du post...'}
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="bg-background border-border"
                />
                <Select value={newPostDomain} onValueChange={(v) => setNewPostDomain(v as Domain)}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {DOMAINS.map(domain => (
                      <SelectItem key={domain.id} value={domain.id}>
                        {language === 'en' ? domain.labelEn : domain.labelFr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder={language === 'en' ? 'Share your insights...' : 'Partagez vos idées...'}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="min-h-[120px] bg-background border-border"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowNewPost(false)}>
                    {language === 'en' ? 'Cancel' : 'Annuler'}
                  </Button>
                  <Button onClick={handleCreatePost} className="bg-primary hover:bg-primary/90">
                    {language === 'en' ? 'Publish' : 'Publier'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Posts */}
          <div className="space-y-6">
            {sortedPosts.map(post => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar 
                        className="h-10 w-10 border-2 border-primary/20 cursor-pointer hover:border-primary transition-colors"
                        onClick={() => navigate(`/profile/${post.authorId}`)}
                      >
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {post.authorAvatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span 
                            className="font-semibold text-foreground hover:text-primary cursor-pointer transition-colors"
                            onClick={() => navigate(`/profile/${post.authorId}`)}
                          >
                            {post.authorName}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {post.authorRole === 'professor' 
                              ? (language === 'en' ? 'Professor' : 'Professeur')
                              : (language === 'en' ? 'Student' : 'Étudiant')}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(post.createdAt, { 
                            addSuffix: true, 
                            locale: language === 'fr' ? fr : enUS 
                          })}
                        </span>
                      </div>
                    </div>
                    
                    {user && post.authorId !== user.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleFollow(post.authorId)}
                        className={follows.includes(post.authorId) ? 'text-primary' : 'text-muted-foreground'}
                      >
                        {follows.includes(post.authorId) ? (
                          <>
                            <UserMinus className="h-4 w-4 mr-1" />
                            {language === 'en' ? 'Unfollow' : 'Ne plus suivre'}
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4 mr-1" />
                            {language === 'en' ? 'Follow' : 'Suivre'}
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <Badge className={`${getDomainColor(post.domain)} text-white`}>
                    {getDomainLabel(post.domain)}
                  </Badge>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">{post.content}</p>
                  </div>

                  {/* Reactions - Only for professor posts */}
                  {post.authorRole === 'professor' && (
                    <div className="flex items-center gap-4 pt-2 border-t border-border">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleLike(post.id)}
                        className={`gap-2 ${post.likes.includes(user?.id || '') ? 'text-red-500' : 'text-muted-foreground'}`}
                      >
                        <Heart className={`h-4 w-4 ${post.likes.includes(user?.id || '') ? 'fill-current' : ''}`} />
                        <span>{post.likes.length}</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleApplause(post.id)}
                        className={`gap-2 ${post.applause.includes(user?.id || '') ? 'text-accent' : 'text-muted-foreground'}`}
                      >
                        <HandMetal className={`h-4 w-4 ${post.applause.includes(user?.id || '') ? 'fill-current' : ''}`} />
                        <span>{post.applause.length}</span>
                      </Button>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments.length}</span>
                      </div>
                    </div>
                  )}

                  {/* Comments */}
                  {post.comments.length > 0 && (
                    <div className="space-y-3 pt-2 border-t border-border">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="flex gap-3 pl-4 border-l-2 border-primary/20">
                          <Avatar 
                            className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                            onClick={() => navigate(`/profile/${comment.authorId}`)}
                          >
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {comment.authorAvatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span 
                                className="font-medium text-sm text-foreground hover:text-primary cursor-pointer transition-colors"
                                onClick={() => navigate(`/profile/${comment.authorId}`)}
                              >
                                {comment.authorName}
                              </span>
                              <span className="font-medium text-sm text-foreground">{comment.authorName}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(comment.createdAt, { 
                                  addSuffix: true, 
                                  locale: language === 'fr' ? fr : enUS 
                                })}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment - Professors only */}
                  {user?.role === 'professor' && (
                    <div className="flex gap-2 pt-2">
                      <Input
                        placeholder={language === 'en' ? 'Add a comment...' : 'Ajouter un commentaire...'}
                        value={commentInputs[post.id] || ''}
                        onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                        className="bg-background border-border"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      />
                      <Button 
                        size="icon"
                        onClick={() => handleAddComment(post.id)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {sortedPosts.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    {language === 'en' 
                      ? 'No posts in this domain yet.' 
                      : 'Aucun post dans ce domaine pour le moment.'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Exchange;
