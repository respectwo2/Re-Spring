package org.ssafy.respring.book.vo;

import jakarta.persistence.*;
import org.ssafy.respring.user.vo.User;

import java.time.LocalDateTime;

@Entity
@Table(name = "book")
public class Book {
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String title;
    private String content;
    private String coverImg;
    private String tag;
    private Long like;
    private Long view;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
