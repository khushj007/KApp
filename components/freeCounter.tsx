import React from "react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-model";

interface freeCounerprops {
  apiLimitCount: Number;
  apiLimit: Number;
  isPro: Boolean;
}
interface promodalInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const FreeCounter = ({ apiLimitCount, apiLimit, isPro }: any) => {
  const { isOpen, onClose, onOpen }: promodalInterface = useProModal();
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {apiLimit} Free Generations
            </p>
            <Progress
              className="h-3"
              value={(apiLimitCount / apiLimit) * 100}
            />
          </div>
          <Button onClick={onOpen} variant="premium" className="w-full">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
