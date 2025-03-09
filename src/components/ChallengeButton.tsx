
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useUser } from '../context/UserContext';
import { generateShareLink } from '../services/gameService';
import { toast } from '@/hooks/use-toast';

const ChallengeButton: React.FC = () => {
  const { username, stats } = useUser();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const shareLink = generateShareLink(username);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Challenge link has been copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy the link manually",
        variant: "destructive",
      });
    }
  };
  
  const shareViaWhatsApp = () => {
    const text = `I scored ${stats.correctAnswers}/${stats.totalPlayed} in Globetrotter! Can you beat me?`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareLink)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Button 
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-travel-green hover:bg-travel-green/90"
      >
        <Share className="h-4 w-4" />
        Challenge Friends
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Challenge your friends</DialogTitle>
            <DialogDescription>
              Share this link with friends to challenge them to beat your score of {stats.correctAnswers}/{stats.totalPlayed}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                readOnly
                value={shareLink}
                className="font-mono text-xs sm:text-sm"
              />
            </div>
            <Button size="sm" className="px-3" onClick={copyToClipboard}>
              {copied ? <CheckCircle className="h-4 w-4" /> : <span>Copy</span>}
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={shareViaWhatsApp}
              className="mt-4"
            >
              Share via WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChallengeButton;
