import { useState, useEffect } from "react";
import { getBookById } from "@/lib/api";
import {Book, Content} from "@/lib/api"

// ✅ 기본 목업 데이터 (API 실패 시 사용)
const fallbackBookData = `
마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

우리 집 제일 가는 귀요미
고구마 주세요
작지만 씩씩한 마루는
위풍당당한 강쥐 총총총

우리 집 제일 가는 꼬꼬마
사랑을 주세요
작지만 강력한 마루는
어마어마한 강쥐 총총총

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
마루도 좋아
링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
모두가 좋아

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

총총총총총 마루도 함께 가요
모두 다 모두 다 모두 다 함께

마루 킁킁 Chill 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

우리 집 제일 가는 귀요미
고구마 주세요
작지만 씩씩한 마루는
위풍당당한 강쥐 총총총

우리 집 제일 가는 꼬꼬마
사랑을 주세요
작지만 강력한 마루는
어마어마한 강쥐 총총총

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
마루도 좋아
링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
모두가 좋아

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

총총총총총 마루도 함께 가요
모두 다 모두 다 모두 다 함께

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

우리 집 제일 가는 귀요미
고구마 주세요
작지만 씩씩한 마루는
위풍당당한 강쥐 총총총

우리 집 제일 가는 꼬꼬마
사랑을 주세요
작지만 강력한 마루는
어마어마한 강쥐 총총총

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
마루도 좋아
링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
모두가 좋아

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

총총총총총 마루도 함께 가요
모두 다 모두 다 모두 다 함께

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

우리 집 제일 가는 귀요미
고구마 주세요
작지만 씩씩한 마루는
위풍당당한 강쥐 총총총

우리 집 제일 가는 꼬꼬마
사랑을 주세요
작지만 강력한 마루는
어마어마한 강쥐 총총총

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
마루도 좋아
링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
모두가 좋아

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

총총총총총 마루도 함께 가요
모두 다 모두 다 모두 다 함께

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

우리 집 제일 가는 귀요미
고구마 주세요
작지만 씩씩한 마루는
위풍당당한 강쥐 총총총

우리 집 제일 가는 꼬꼬마
사랑을 주세요
작지만 강력한 마루는
어마어마한 강쥐 총총총

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
마루도 좋아
링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
모두가 좋아

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

총총총총총 마루도 함께 가요
모두 다 모두 다 모두 다 함께

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

우리 집 제일 가는 귀요미
고구마 주세요
작지만 씩씩한 마루는
위풍당당한 강쥐 총총총

우리 집 제일 가는 꼬꼬마
사랑을 주세요
작지만 강력한 마루는
어마어마한 강쥐 총총총

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
마루도 좋아
링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
모두가 좋아

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

총총총총총 마루도 함께 가요
모두 다 모두 다 모두 다 함께

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

우리 집 제일 가는 귀요미
고구마 주세요
작지만 씩씩한 마루는
위풍당당한 강쥐 총총총

우리 집 제일 가는 꼬꼬마
사랑을 주세요
작지만 강력한 마루는
어마어마한 강쥐 총총총

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
마루도 좋아
링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
모두가 좋아

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

총총총총총 마루도 함께 가요
모두 다 모두 다 모두 다 함께

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

우리 집 제일 가는 귀요미
고구마 주세요
작지만 씩씩한 마루는
위풍당당한 강쥐 총총총

우리 집 제일 가는 꼬꼬마
사랑을 주세요
작지만 강력한 마루는
어마어마한 강쥐 총총총

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
마루도 좋아
링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
모두가 좋아

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

총총총총총 마루도 함께 가요
모두 다 모두 다 모두 다 함께

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

우리 집 제일 가는 귀요미
고구마 주세요
작지만 씩씩한 마루는
위풍당당한 강쥐 총총총

우리 집 제일 가는 꼬꼬마
사랑을 주세요
작지만 강력한 마루는
어마어마한 강쥐 총총총

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
마루도 좋아
링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
모두가 좋아

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

총총총총총 마루도 함께 가요
모두 다 모두 다 모두 다 함께

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

우리 집 제일 가는 귀요미
고구마 주세요
작지만 씩씩한 마루는
위풍당당한 강쥐 총총총

우리 집 제일 가는 꼬꼬마
사랑을 주세요
작지만 강력한 마루는
어마어마한 강쥐 총총총

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
마루도 좋아
링가링가링가 링가링가링가 링가링가링가
언니가 좋아
링가링가링가 링가링가링가 링가링가링가
모두가 좋아

마루 킁킁 마루 쫑긋 마루 덥석

총총총총총 짧은 다리 파다닥

마루 폴짝 마루 까딱 마루 꼴깍
총총총총총 언니를 따라 가요

마루 깜짝 마루 움찔 마루 머쓱

총총총총총 삐진 모습 새초롬

마루 살짝 마루 깜빡 마루 짝짝
총총총총총 언니랑 함께 가요

총총총총총 마루도 함께 가요
모두 다 모두 다 모두 다 함께`;

// ✅ API에서 책 데이터 가져오기
  export function useBookData(bookId: string) {
      const [bookContent, setBookContent] = useState<Content>();
      const [bookTitle, setBookTitle] = useState<string>();
      const [isLoading, setIsLoading] = useState<boolean>(true);
    
      useEffect(() => {
        const fetchBookData = async () => {
          try {
            setIsLoading(true);
            console.log(`📢 API 요청 시작: /books/${bookId}`);
    
            const tempUserId = ""
            const book : Book = await getBookById(parseInt(bookId), tempUserId);
    
            if (!book.content || Object.keys(book.content).length === 0) {
              throw new Error("📢 책 내용이 비어 있습니다. 목업 데이터를 사용합니다.");
            }

            setBookTitle(book.title);
            setBookContent(book.content);

            // const chapters = JSON.parse(book.content) as Chapter[];
            // setBookChapters(chapters);

            // const newContentText = chapters.map((chapter) => `${chapter.chapterTitle}\n${chapter.content}`).join('\n');
            // setPlainBookContent(newContentText);

            console.log("✅ API 요청 성공, 책 데이터 적용됨.");
          } catch (err) {
            console.error("🚨 책 데이터 가져오기 실패:", err);
            setBookTitle("임시 제목");
            setBookContent({}); // ✅ 실패 시 기본 데이터 적용
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchBookData();
      }, [bookId]);
    
      // ✅ 디버깅용: 상태 변화 로깅
      useEffect(() => {
        console.log("📖 현재 bookContent 상태:", bookContent);
      }, [bookContent]);
    
      return { bookContent, isLoading, bookTitle };
    }