# API 리스트

## 유저

## 밸런스게임 balanceGame

- create: createBalanceGame .
- findAll: balanceGames
- findOne: balanceGame .
- update: updateBalanceGame .
- remove: removeBalanceGame .

## 투표 balanceGameSelectionVote

- create(logined): createVoteLogined .
- create(notLogined): createVoteNotLogined .
- [dont need?] findAll: balanceGameSelectionVotes
- [dont need?] findOne: balanceGameSelectionVote
- update(logined): updateVoteLogined .
- remove(logined): removeVoteLogined .

## 댓글

- create: createComment
- findComments: commentsByGameId
- update: updateComment
- remove: removeComment

## 답글(대댓글)

- create: createReply
- update: updateReply
- remove: removeReply

## [ notYet ] 알림

# API 요청 예시

## 유저

## 밸런스게임 balanceGame

- create: createBalanceGame # [ RETURN => BalanceGame ]

```graphql
HTTP HTEADER
{
  "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NhaWxJZCI6MTcyMDM3MDE3OCwidXNlcklkIjoiMTg0NWI2MWUtM2NhMi00OWM4LWJkMDktNDA0Y2U5NzRkNTQ5IiwiaWF0IjoxNjIxMDU5MzgzLCJleHAiOjE2NTI1OTUzODN9.AiDa9DFGMAHyScvcYdKthWYpGgrtL6A0OrM7Wdu1T10"
}

mutation {
  createBalanceGame(createBalanceGameInput:{
    description: "토맛토마토, 토마토맛토"
    balanceGameSelections: [
      {
        order: 0   # avaiable value:  O | 1
        description: "토맛 토마토",
        textColor: "#ff0000"
        backgroundColor: "#ff0000"
        backgroundImage: "파일 업로드 구현할게요 !"
      },
      {
        order: 1,
        description:"토마토맛 토"
        textColor: "#ff0000",
        backgroundColor: "#ff0000"
        backgroundImage: "파일 업로드 구현할게요 !"
      }
    ],
    balanceGameKeywords: [
      {
        name: "음식"
      },{
        name: "토사물"
      }, {
        name: "고전"
      }
    ]
  }) {
    id
    userId
  	totalVoteCount
    balanceGameSelections{
      id
      order
      voteCount
      description
      textColor
      backgroundColor
      backgroundImage
      balanceGameId
    }
    balanceGameKeywords {
      id
      name
      balanceGameId
    }
  }
}

```

- findAll: balanceGames # [ RETURN => BalanceGame[] ]

```graphql
query {
  balanceGames(balanceGamesState: { limit: 2, offset: 1 }) {
    num
    balanceGame {
      id
      totalVoteCount
      commentCount
      balanceGameSelections {
        id
        order
        description
        textColor
        backgroundColor
        backgroundImage
        voteCount
      }
      balanceGameKeywords {
        id
        name
      }
      createdAt
    }
  }
}
```

- findOne Logined: balanceGameLogined [ RETURN => BalanceGame ]

```graqhql
 {
  balanceGameLogined (id:"a0717af5-e8d9-4128-acfc-f9e8b3a1f3c3")
	 {
    id
    userId
  	totalVoteCount
    commentCount
    isVoted
    balanceGameSelections{
      id
      order
      voteCount
      description
      textColor
      backgroundColor
      backgroundImage
      balanceGameId
    }
    balanceGameKeywords {
      id
      name
      balanceGameId
    }
  }
}
```

- findOne NotLogined: balanceGameNotLogined [ RETURN => BalanceGame ]

```graqhql
 {
  balanceGameNotLogined (id:"a0717af5-e8d9-4128-acfc-f9e8b3a1f3c3")
	 {
    id
    userId
  	totalVoteCount
    commentCount
    isVoted
    balanceGameSelections{
      id
      order
      voteCount
      description
      textColor
      backgroundColor
      backgroundImage
      balanceGameId
    }
    balanceGameKeywords {
      id
      name
      balanceGameId
    }
  }
}
```

- update: updateBalanceGame [ RETURN => BalanceGame ]

```graphql
HTTP HTEADER
{
  "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NhaWxJZCI6MTcyMDM3MDE3OCwidXNlcklkIjoiMTg0NWI2MWUtM2NhMi00OWM4LWJkMDktNDA0Y2U5NzRkNTQ5IiwiaWF0IjoxNjIxMDU5MzgzLCJleHAiOjE2NTI1OTUzODN9.AiDa9DFGMAHyScvcYdKthWYpGgrtL6A0OrM7Wdu1T10"
}

mutation {
  updateBalanceGame(
    id: "42f5dc16-53d8-457c-9b19-d877f4c249d0",
    updateBalanceGameInput:{
      description: "토맛토마토, 토마토맛토"
      balanceGameSelections: [
        {
          id:  "846b0d16-ffa5-4246-8ca2-78042eb586b7"
          description: "토맛 토마토 update data",
          textColor: "주황 update"
          backgroundColor: "노랑 update"
          backgroundImage: "파일 업로드 구현할게요 ! update"
        },
        {
          id: "1a26f8b6-ed0d-40a1-9dcf-321b3e62f49a"
          description:"토마토맛 토update"
          textColor: "빨강 update",
          backgroundColor: "똥색 update"
          backgroundImage: "파일 업로드 구현할게요 ! update"
        }
      ],
      balanceGameKeywords: [
        {
          name: "음식 update"
        },{
          name: "토사물 update"
        }, {
          name: "고전 update"
        }
      ]
  }) {
    id
    userId
  	totalVoteCount
    balanceGameSelections{
      id
      order
      voteCount
      description
      textColor
      backgroundColor
      backgroundImage
      balanceGameId
    }
    balanceGameKeywords {
      id
      name
      balanceGameId
    }
  }
}
```

- remove: removeBalanceGame [ RETURN => Boolean ]

```graphql
HTTP HEADER
{
  "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NhaWxJZCI6MTcyMDM3MDE3OCwidXNlcklkIjoiMTg0NWI2MWUtM2NhMi00OWM4LWJkMDktNDA0Y2U5NzRkNTQ5IiwiaWF0IjoxNjIxMDU5MzgzLCJleHAiOjE2NTI1OTUzODN9.AiDa9DFGMAHyScvcYdKthWYpGgrtL6A0OrM7Wdu1T10"
}

mutation {
  removeBalanceGame(id:"a0717af5-e8d9-4128-acfc-f9e8b3a1f3c3")
}
```

## 투표 balanceGameSelectionVote

- create(logined): createVoteLogined [ RETURN => BalanceGame ]

```graphql
HTTP HEADER
{
  "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NhaWxJZCI6MTcyMDM3MDE3OCwidXNlcklkIjoiMTg0NWI2MWUtM2NhMi00OWM4LWJkMDktNDA0Y2U5NzRkNTQ5IiwiaWF0IjoxNjIxMDU5MzgzLCJleHAiOjE2NTI1OTUzODN9.AiDa9DFGMAHyScvcYdKthWYpGgrtL6A0OrM7Wdu1T10"
}

mutation {
	createVoteLogined(
    createBalanceGameSelectionVoteInput: {
      balanceGameId: "1048713c-8586-4fd7-8cbf-d2e324715751"
      balanceGameSelectionId: "64315c5b-856c-4f46-ba57-502797f184d1"
    }
  ) {
    id
		totalVoteCount
    balanceGameSelections {
      id
      order
      voteCount
    }
  }
}
```

- create(notLogined): createVoteNotLogined [ RETURN => BalanceGame ]

```graphql
mutation {
  createVoteNotLogined(
    createBalanceGameSelectionVoteInput: {
      balanceGameId: "45291777-cb15-4e28-b91d-db9b23b9cc24"
      balanceGameSelectionId: "9809c7da-6989-4aa1-93d9-cc06a79a5309"
    }
  ) {
    id
    totalVoteCount
    balanceGameSelections {
      id
      order
      voteCount
    }
  }
}
```

- [dont need?] findAll: balanceGameSelectionVotes
- [dont need?] findOne: balanceGameSelectionVote

- update(logined): updateVoteLogined [ RETURN => BalanceGame ]

```graphql
HTTP HEADER
{
  "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NhaWxJZCI6MTcyMDM3MDE3OCwidXNlcklkIjoiMTg0NWI2MWUtM2NhMi00OWM4LWJkMDktNDA0Y2U5NzRkNTQ5IiwiaWF0IjoxNjIxMDU5MzgzLCJleHAiOjE2NTI1OTUzODN9.AiDa9DFGMAHyScvcYdKthWYpGgrtL6A0OrM7Wdu1T10"
}

mutation {
	updateVoteLogined(
    updateBalanceGameSelectionVoteInput: {
      balanceGameId: "a0717af5-e8d9-4128-acfc-f9e8b3a1f3c3"
      newBalanceGameSelectionId: "a3c3b77b-f302-44f5-9360-c33b4becc7d9"
    }
  ) {
    id
		totalVoteCount
    balanceGameSelections {
      id
      order
      voteCount
    }
  }
}
```

- remove: removeVoteLogined [ RETURN => Boolean ]

```graphql
HTTP HEADER
{
  "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NhaWxJZCI6MTcyMDM3MDE3OCwidXNlcklkIjoiMTg0NWI2MWUtM2NhMi00OWM4LWJkMDktNDA0Y2U5NzRkNTQ5IiwiaWF0IjoxNjIxMDU5MzgzLCJleHAiOjE2NTI1OTUzODN9.AiDa9DFGMAHyScvcYdKthWYpGgrtL6A0OrM7Wdu1T10"
}

mutation {
  removeVoteLogined(balanceGameId: "45291777-cb15-4e28-b91d-db9b23b9cc24") {
		id
    totalVoteCount
    balanceGameSelections {
      id
      voteCount
    }
  }
}
```

## 댓글

- create: createComment [ RETURN => Comment ]

```graphql
HTTP HEADER
{
  "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NhaWxJZCI6MTcyMDM3MDE3OCwidXNlcklkIjoiMTg0NWI2MWUtM2NhMi00OWM4LWJkMDktNDA0Y2U5NzRkNTQ5IiwiaWF0IjoxNjIxMDU5MzgzLCJleHAiOjE2NTI1OTUzODN9.AiDa9DFGMAHyScvcYdKthWYpGgrtL6A0OrM7Wdu1T10"
}

mutation {
  createComment(createCommentInput:{
    balanceGameId: "45291777-cb15-4e28-b91d-db9b23b9cc24"
    content:"댓글이당2"
  }) {
    id
    content
    createdAt
  }
}

```

- findComments: commentsByGameId [ RETURN => Comment[] ]

```graphql
{
  commentsByGameId(gameId: "45291777-cb15-4e28-b91d-db9b23b9cc24") {
    id
    content
    color
    replies {
      id
      content
      color
    }
  }
}
```

- update: updateComment [ RETURN => Comment ]

```graphql
HTTP HEADER
{
  "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NhaWxJZCI6MTcyMDM3MDE3OCwidXNlcklkIjoiMTg0NWI2MWUtM2NhMi00OWM4LWJkMDktNDA0Y2U5NzRkNTQ5IiwiaWF0IjoxNjIxMDU5MzgzLCJleHAiOjE2NTI1OTUzODN9.AiDa9DFGMAHyScvcYdKthWYpGgrtL6A0OrM7Wdu1T10"
}

mutation {
  updateComment(updateCommentInput: { id: "b6c29396-aa96-46a6-9c97-c0da6ae45709", content: "수정 댓글" }) {
    id
    content
    userId
  }
}
```

- remove: removeComment [ RETURN => Boolean]

```graphql
HTTP HEADER
{
  "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NhaWxJZCI6MTcyMDM3MDE3OCwidXNlcklkIjoiMTg0NWI2MWUtM2NhMi00OWM4LWJkMDktNDA0Y2U5NzRkNTQ5IiwiaWF0IjoxNjIxMDU5MzgzLCJleHAiOjE2NTI1OTUzODN9.AiDa9DFGMAHyScvcYdKthWYpGgrtL6A0OrM7Wdu1T10"
}

mutation {
  removeComment(id: "8a1621db-0f2c-4482-9a04-5af3f5b1659f")
}

```

## 답글(대댓글)

- create: createReply [ RETURN => Comment ]

```graphql
{
  "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NhaWxJZCI6MTcyMDM3MDE3OCwidXNlcklkIjoiMTg0NWI2MWUtM2NhMi00OWM4LWJkMDktNDA0Y2U5NzRkNTQ5IiwiaWF0IjoxNjIxMDU5MzgzLCJleHAiOjE2NTI1OTUzODN9.AiDa9DFGMAHyScvcYdKthWYpGgrtL6A0OrM7Wdu1T10"
}

mutation {
  createReply(createReplyInput:{
    commentId: "aefef3b8-904b-428c-8409-8c15d64b5ef2"
    balanceGameId: "45291777-cb15-4e28-b91d-db9b23b9cc24",
    content: "새 eoeot글"
  }) {
    id
    content
    color
    createdAt
  }
}
```

- update: updateReply [ RETURN => Reply ]

```graphql
HTTP HEADER
{
  "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NhaWxJZCI6MTcyMDM3MDE3OCwidXNlcklkIjoiMTg0NWI2MWUtM2NhMi00OWM4LWJkMDktNDA0Y2U5NzRkNTQ5IiwiaWF0IjoxNjIxMDU5MzgzLCJleHAiOjE2NTI1OTUzODN9.AiDa9DFGMAHyScvcYdKthWYpGgrtL6A0OrM7Wdu1T10"
}

mutation {
  updateReply(updateReplyInput:{
    replyId: "fe081e14-34c8-4f43-997d-4e5d0a7d2192"
    content: "asdfasdf"
  }) {
    id
    content
    createdAt
  }
}
```

- remove: removeReply [ RETURN => Boolean ]

```graphql
HTTP HEADER
{
  "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NhaWxJZCI6MTcyMDM3MDE3OCwidXNlcklkIjoiMTg0NWI2MWUtM2NhMi00OWM4LWJkMDktNDA0Y2U5NzRkNTQ5IiwiaWF0IjoxNjIxMDU5MzgzLCJleHAiOjE2NTI1OTUzODN9.AiDa9DFGMAHyScvcYdKthWYpGgrtL6A0OrM7Wdu1T10"
}

mutation {
  removeReply(replyId:"f9038325-7839-4143-b8e9-dd3d5a7fc61d",)
}
```

## [ notYet ] 알림
