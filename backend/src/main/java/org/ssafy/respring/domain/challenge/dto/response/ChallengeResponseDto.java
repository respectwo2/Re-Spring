package org.ssafy.respring.domain.challenge.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.ssafy.respring.domain.tag.vo.Tag;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
public class ChallengeResponseDto {
    private Long id;
    private String title;
    private String description;
    private String image;
    private LocalDateTime registerDate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Set<Tag> tags;
    private boolean isLiked;
    private Long likes;
    private Long views;
    private Long participantCount;
    private String ownerNickname; // 챌린지 생성자 정보 포함
    private Long chatroomId;
}
