"use client";

import { useState } from "react";
import { ChallengeCalendar } from "./challenge-calendar";
import { ExpandableDescription } from "./expandable-description";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Users, CalendarIcon, Trophy, Zap, Search } from "lucide-react";
import { format, parseISO, differenceInDays } from "date-fns";
import { ko } from "date-fns/locale";
import type { ChallengeDetail } from "@/lib/mocks/challenge-detail";
import type { ParticipantListResponse } from "@/types/participant";
import { ParticipantListModal } from "./participant-list-modal";
import { ChallengeActionButton } from "./challenge-action-button";
import type { Theme } from "@/types/theme";

interface ChallengeDetailTabProps {
  challenge: ChallengeDetail;
}

export function ChallengeDetailTab({ challenge }: ChallengeDetailTabProps) {
  const [localChallenge, setLocalChallenge] = useState(challenge);
  const [isParticipantListOpen, setIsParticipantListOpen] = useState(false);
  const [participantList, setParticipantList] = useState<ParticipantListResponse | null>(null);
  const [isParticipating, setIsParticipating] = useState(false);
  const [isTodayCompleted, setIsTodayCompleted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  const startDate = parseISO(localChallenge.startDate);
  const endDate = parseISO(localChallenge.endDate);

  const calculateTotalDays = () => {
    return differenceInDays(endDate, startDate) + 1;
  };

  const calculateTotalSuccess = () => {
    return Object.values(localChallenge.records).filter((status) => status === "SUCCESS").length;
  };

  const totalDays = calculateTotalDays();
  const totalSuccess = calculateTotalSuccess();

  const handleCompleteToday = async () => {
    try {
      // 실제 구현에서는 여기에 서버 액션이나 API 호출이 들어갈 것입니다
      setLocalChallenge((prev) => ({
        ...prev,
        records: {
          ...prev.records,
          [format(new Date(), "yyyy-MM-dd")]: "SUCCESS",
        },
        successToday: true,
      }));
      setIsTodayCompleted(true);
    } catch (error) {
      console.error("Failed to complete challenge:", error);
    }
  };

  const handleParticipantListClick = async () => {
    try {
      // 실제 구현에서는 여기에 API 호출이 들어갈 것입니다
      const response: ParticipantListResponse = {
        challengeId: localChallenge.id,
        participantCount: localChallenge.participantCount,
        participants: [
          {
            userId: "dd5a7b3c-d887-11ef-b310-d4f32d147183",
            nickname: "홍길동",
            profileImage: "http://example.com/profile.jpg",
          },
          {
            userId: "ff6b8c4d-d99f-11ef-b310-d4f32d147183",
            nickname: "김철수",
            profileImage: "http://example.com/profile2.jpg",
          },
        ],
      };
      setParticipantList(response);
      setIsParticipantListOpen(true);
    } catch (error) {
      console.error("Failed to fetch participant list:", error);
    }
  };

  const handleJoinChallenge = async () => {
    try {
      // 실제 구현에서는 여기에 API 호출이 들어갈 것입니다
      console.log("챌린지 참여 API 호출");
      setIsParticipating(true);
    } catch (error) {
      console.error("챌린지 참여 중 오류 발생:", error);
    }
  };

  return (
    <div className="space-y-6">
      <ExpandableDescription description={localChallenge.description} />

      <div className="flex flex-wrap gap-4">
        {localChallenge.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="bg-[#F8BBD0] text-gray-700">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-base lg:text-lg font-semibold flex items-center mb-2">
            <CalendarIcon className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-[#8BC34A]" />
            도전 기간
          </h4>
          <p className="text-gray-600 text-sm lg:text-base">
            {format(startDate, "yyyy.M.d", { locale: ko })} - {format(endDate, "yyyy.M.d", { locale: ko })}
          </p>
        </div>
        <div className="text-right">
          <h4 className="text-base lg:text-lg font-semibold flex items-center justify-end mb-2">
            <Users className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-[#F8BBD0]" />
            참여 현황
          </h4>
          <Button variant="outline" className="p-2 h-auto hover:bg-gray-100 transition-colors duration-200 border border-gray-200" onClick={handleParticipantListClick}>
            <span className="text-sm lg:text-base mr-2">{localChallenge.participantCount}명</span>
            <Search className="w-4 h-4 lg:w-5 lg:h-5 text-[#8BC34A]" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              최장 연속 달성
            </h4>
            <p className="text-2xl font-bold text-right">{localChallenge.longestStreak}일</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold flex items-center">
              <Zap className="w-5 h-5 mr-2 text-[#8BC34A]" />
              현재 연속 달성
            </h4>
            <p className="text-2xl font-bold text-right">{localChallenge.currentStreak}일</p>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold flex items-center mb-2">
            <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
            성공률
          </h4>
          <Progress value={localChallenge.successRate} className="w-full" />
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-gray-500">
              총 {totalDays}일 중 {totalSuccess}일 성공
            </p>
            <p>{localChallenge.successRate.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold flex items-center mb-2">
          <CalendarIcon className="w-5 h-5 mr-2 text-[#8BC34A]" />
          달성 기록
        </h4>
        <ChallengeCalendar records={localChallenge.records} startDate={startDate} endDate={endDate} />
      </div>

      <ChallengeActionButton isParticipating={isParticipating} isTodayCompleted={isTodayCompleted} theme={theme} onComplete={handleCompleteToday} onJoin={handleJoinChallenge} />

      {participantList && (
        <ParticipantListModal
          isOpen={isParticipantListOpen}
          onClose={() => setIsParticipantListOpen(false)}
          participants={participantList.participants}
          participantCount={participantList.participantCount}
        />
      )}
    </div>
  );
}
