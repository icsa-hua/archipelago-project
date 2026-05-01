import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LogIn, User, GraduationCap, BookOpen } from 'lucide-react';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(email, password);
    if (success) {
      onOpenChange(false);
      setEmail('');
      setPassword('');
    } else {
      setError(language === 'en' ? 'Invalid email or password' : 'Email ou mot de passe invalide');
    }
  };

  const quickLogin = (type: 'student' | 'professor') => {
    const credentials = type === 'student' 
      ? { email: 'student@archipelago.eu', password: 'student123' }
      : { email: 'professor@archipelago.eu', password: 'professor123' };
    
    const success = login(credentials.email, credentials.password);
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <LogIn className="h-5 w-5 text-primary" />
            {language === 'en' ? 'Sign In' : 'Connexion'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {language === 'en' 
              ? 'Access the ARCHIPELAGO Knowledge Hub Platform' 
              : 'Accédez à la plateforme d\'échange ARCHIPELAGO'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Quick Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4 border-primary/30 hover:bg-primary/10"
              onClick={() => quickLogin('student')}
            >
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">
                {language === 'en' ? 'Student' : 'Étudiant'}
              </span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4 border-accent/30 hover:bg-accent/10"
              onClick={() => quickLogin('professor')}
            >
              <BookOpen className="h-6 w-6 text-accent" />
              <span className="text-sm font-medium">
                {language === 'en' ? 'Professor' : 'Professeur'}
              </span>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                {language === 'en' ? 'Or continue with email' : 'Ou continuer avec email'}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@archipelago.eu"
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                {language === 'en' ? 'Password' : 'Mot de passe'}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-background border-border"
              />
            </div>
            
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              {language === 'en' ? 'Sign In' : 'Se connecter'}
            </Button>
          </form>

          {/* <p className="text-xs text-center text-muted-foreground">
            {language === 'en' 
              ? 'Demo: student@archipelago.eu / student123 or professor@archipelago.eu / professor123'
              : 'Démo: student@archipelago.eu / student123 ou professor@archipelago.eu / professor123'}
          </p> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
