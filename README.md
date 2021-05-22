GraphQL + NestJS + typeORM + AWS RDS
보일러 플레이트 입니다.

# 설정 사항

## 의존성 설치
```npm install```

## RDS 셋팅
root 에 
- config/.dev.env
- config/.prod.env<br>
두파일 추가하시고 DB 내용 추가하셔야 합니다. 
<br>
DB_HOST=<br>
DB_USERNAME=<br>
DB_PASSWORD=<br>
DB_NAME=<br>

## 실행
```npm start:dev```

## 프로덕션 실행
```npm run start:prod```