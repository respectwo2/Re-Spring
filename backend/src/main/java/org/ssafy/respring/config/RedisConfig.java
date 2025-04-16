package org.ssafy.respring.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.ssafy.respring.domain.book.vo.Book;
import org.ssafy.respring.domain.challenge.vo.Challenge;

import java.time.Duration;
import java.util.List;

@Configuration
@EnableCaching
public class RedisConfig {

    @Value("${spring.data.redis.host}")
    private String redisHost;

    @Value("${spring.data.redis.port}")
    private int redisPort;

    @Value("${spring.data.redis.password:}") // 기본값을 빈 문자열로 설정
    private String redisPassword;

    //세션용 Redis
    @Bean
    public RedisConnectionFactory defaultRedisConnectionFactory() {
        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration(redisHost, redisPort);
        config.setDatabase(0); // 세션용 index
        if (!redisPassword.isBlank()) {
            config.setPassword(redisPassword);
        }
        return new LettuceConnectionFactory(config);
    }

    //캐시용 Redis
    @Bean
    public RedisConnectionFactory cacheRedisConnectionFactory() {
        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration(redisHost, redisPort);
        config.setDatabase(1); // 캐시 전용 index
        if (!redisPassword.isBlank()) {
            config.setPassword(redisPassword);
        }
        return new LettuceConnectionFactory(config);
    }

    @Bean
    public RedisCacheManager redisCacheManager(RedisConnectionFactory cacheRedisConnectionFactory) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(10)) //TTL 설정
                .prefixCacheNameWith("cache:")
                .disableCachingNullValues();

        return RedisCacheManager.builder(cacheRedisConnectionFactory)
                .cacheDefaults(config)
                .build();
    }

    //도메인용 레디스
    @Bean
    public RedisConnectionFactory domainRedisConnectionFactory() {
        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration(redisHost, redisPort);
        config.setDatabase(2);
        if (!redisPassword.isBlank()) {
            config.setPassword(redisPassword);
        }
        return new LettuceConnectionFactory(config);

    }


    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory domainRedisConnectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(domainRedisConnectionFactory);

        //   Jackson ObjectMapper 설정 (LocalDateTime 문제 해결)
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule()); // LocalDateTime 지원 추가
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        //   동일한 ObjectMapper를 직렬화/역직렬화에 적용
        GenericJackson2JsonRedisSerializer serializer = new GenericJackson2JsonRedisSerializer(objectMapper);

        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(serializer);
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(serializer);

        template.afterPropertiesSet();
        return template;
    }

    @Bean
    public RedisTemplate<String, List<Challenge>> challengeRedisTemplate(RedisConnectionFactory domainRedisConnectionFactory) {
        RedisTemplate<String, List<Challenge>> template = new RedisTemplate<>();
        template.setConnectionFactory(domainRedisConnectionFactory);
        template.setKeySerializer(new StringRedisSerializer());

        //   ObjectMapper 설정 (LocalDateTime 직렬화 지원)
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        GenericJackson2JsonRedisSerializer serializer = new GenericJackson2JsonRedisSerializer(objectMapper);
        template.setValueSerializer(serializer);

        template.afterPropertiesSet();
        return template;
    }


    @Bean
    public RedisTemplate<String, List<Book>> bookRedisTemplate(RedisConnectionFactory domainRedisConnectionFactory) {
        RedisTemplate<String, List<Book>> template = new RedisTemplate<>();
        template.setConnectionFactory(domainRedisConnectionFactory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer()); // JSON 직렬화
        return template;
    }


}
