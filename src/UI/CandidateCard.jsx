import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle } from "lucide-react";

const CandidateCard = ({
  candidate,
  position,
  isSelected,
  onSelect,
  className = "",
  ImageWithFallback,
  hasVoted,
}) => {
  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 hover:border-purple-500 ${className}`}
      onClick={onSelect}
    >
      <CardHeader className="text-center pb-4">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24 ring-4 ring-blue-800/10">
            <div className="w-24 h-24 ring-4 ring-blue-800/10 rounded-full overflow-hidden">
              <ImageWithFallback
                src={candidate.photoUrl}
                alt={candidate.name}
                fallbackSrc="/placeholder.svg"
                className="w-full h-full object-cover"
                fallbackText={
                  candidate.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "??"
                }
              />
            </div>
          </Avatar>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-blue-800 font-sans">
              {candidate.name}
            </h2>
            <Badge
              variant="secondary"
              className={`${
                candidate.positionColor || "bg-purple-500"
              } text-white hover:opacity-90 px-3 py-1`}
            >
              {candidate.position || position?.name}
            </Badge>
            <p className="text-sm text-muted-foreground font-medium">
              {candidate?.yearOfStudy}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* <div>
          <h3 className="font-bold text-lg mb-3 text-foreground">Platform</h3>
          <ul className="space-y-2">
            {candidate.promises?.title?.map((policy, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  {policy}
                </span>
              </li>
            )) || (
              <li className="text-sm text-muted-foreground">
                No platform information available
              </li>
            )}
          </ul>
        </div> */}

        {isSelected && (
          <div className="flex items-center justify-center p-3 bg-blue-100 rounded-lg">
            <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-700 font-medium">
              Selected for {position?.name}
            </span>
          </div>
        )}

        <div className="pt-4 border-t border-border">
          <div className="space-y-3">
            <p className="text-sm font-medium text-blue-800 text-center">
              Vote for {candidate.name?.split(" ")[0]} in Student Elections!
            </p>
            {/* <Button
              className="w-full bg-blue-800 hover:bg-blue-700 text-white font-medium transition-colors"
              size="lg"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card selection when clicking this button
                // Handle view full platform
              }}
            >
              View Full Platform
            </Button> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
