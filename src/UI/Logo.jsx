import React from "react";
import logo from "../assets/smart-logo.png1.png";
import { Vote } from "lucide-react";

const Logo = ({ className }) => {
  return (
    <div className="flex justify-center w-60">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <Vote className="w-7 h-7 text-white" />
        </div>
        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          SmartVote
        </span>
      </div>
    </div>
  );
};

export default Logo;
