# API 리스트

## 유저

## 밸런스게임 balanceGame

- create: createBalanceGame
- findAll: balanceGames
- findOne: balanceGame
- update: updateBalanceGame
- remove: removeBalanceGame

## 투표 balanceGameSelectionVote

- create(logined): createBalanceGameSelectionVoteLogined
- create(notLogined): createBalanceGameSelectionVoteNotLogined
- findAll: balanceGameSelectionVotes
- findOne: balanceGameSelectionVote
- update(notLogined): removeBalanceGameSelectionVoteLogined
- update(logined): updateBalanceGameSelectionVoteLogined

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

- create: createBalanceGame

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
        order: 0
        description: "토맛 토마토",
        textColor: "주황"
        backgroundColor: "노랑"
        backgroundImage: "파일 업로드 구현할게요 !"
      },
      {
        order: 1,
        description:"토마토맛 토"
        textColor: "빨강",
        backgroundColor: "똥색"
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

- findAll: balanceGames
- findOne: balanceGame
- update: updateBalanceGame

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

- remove: removeBalanceGame

## 투표 balanceGameSelectionVote

- create(logined): createBalanceGameSelectionVoteLogined
- create(notLogined): createBalanceGameSelectionVoteNotLogined
- findAll: balanceGameSelectionVotes
- findOne: balanceGameSelectionVote
- update(notLogined): removeBalanceGameSelectionVoteLogined
- update(logined): updateBalanceGameSelectionVoteLogined

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