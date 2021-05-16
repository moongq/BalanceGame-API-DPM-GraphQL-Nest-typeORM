# balanceGame 생성하기 seleciton과 category 입력 가능.

# M createBalanceGame [api_1]

```graphql
HTTP HEADER
{
  "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NhaWxJZCI6MTcyMDM3MDE3OCwidXNlcklkIjoiMTg0NWI2MWUtM2NhMi00OWM4LWJkMDktNDA0Y2U5NzRkNTQ5IiwiaWF0IjoxNjIxMDU5MzgzLCJleHAiOjE2NTI1OTUzODN9.AiDa9DFGMAHyScvcYdKthWYpGgrtL6A0OrM7Wdu1T10"
}

mutation {
  createBalanceGame(
    createBalanceGameInput: {
      description: "this is balancegame1"
      balanceGameSelections: [
        { description: "Desciption1", textColor: "ff1323", order: 1 }
        { description: "Desciption2",  textColor: "ff1323", order: 2 }
      ]
      balanceGameKeywords: [{ name: "카테고리1ㅣ" }, { name: "카테고리2" }]
    }
  ) {
    id
    description
    balanceGameSelections {
      id
      description
      textColor
      balanceGameId
      backgroundColor
      backgroundImage
      order
    }
    balanceGameKeywords {
      id
      name
      balanceGameId
    }
  }
}
```

# M updateBalanceGame

```graphql
mutation {
  updateBalanceGame(
    id: "d3019d43-c769-4024-82f9-cb979e9eade5"
    updateBalanceGameInput: {
      description: "dddd"
      balanceGameSelections: [
        {
          id: "46cba631-6692-4362-8ea1-3d7691463d68"
          description: "change desc1"
          textColor: "ff1323"
          backgroundColor: "der222"
          backgroundImage: "http~"
          order: 1
        }
        {
          id: "b3c0e407-e510-476a-89c8-dba29653ed8a"
          description: "change desc2"
          textColor: "ff1323"
          backgroundColor: "der222"
          backgroundImage: "http"
          order: 2
        }
      ]
      balanceGameKeywords: [{ name: "카테" }, { name: "카테고리4" }]
    }
  ) {
    id
    description
    balanceGameSelections {
      id
      description
      textColor
      balanceGameId
      backgroundColor
      backgroundImage
      order
    }
    balanceGameKeywords {
      id
      name
    }
  }
}
```

# M removeBalanceGame

```graphql
mutation {
  removeBalanceGame(id: "16cf0138-c235-4723-bd6e-1c33cfcb41ab")
}
```

# M fileUpload

key: operations

value: { "query": "mutation UploadFile($file1:Upload!) { uploadFile(file1:$file1) }", "variables": { "file1": null}}

key: map

value: { "0": ["variables.file1"] , "1": ["variables.file2"]}

key: 0

value: 파일

# 로그인 관련 작업

## M login

> 로그인 기능 (프론트에 토큰 받아서 진행)

```graphql
mutation {
  login(loginUserInput: { socialType: "kakao", socialKey: "CKKEwhnpV4ImqIALe0_A_scKiehXiRxp3kolbQorDR4AAAF5bekcyw" }) {
    jwt
    email
    status
  }
}
```

## Q mypage

> 마이페이지 확인

```graphql
query {
  mypage {
    id
  }
}
```

- HTTP headers

```
{
  "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NhaWxJZCI6MTcyMDM3MDE3OCwidXNlcklkIjoiMTg0NWI2MWUtM2NhMi00OWM4LWJkMDktNDA0Y2U5NzRkNTQ5IiwiaWF0IjoxNjIwNTYwMjc4LCJleHAiOjE2NTIwOTYyNzh9.ppVgebenN8R7IeHN3Is6D3KX-CXMMgjmhP6crDyqu_Y"
}
```

## M setProfile

> 프로필 업데이트 진행 headers authorization 필요

```graphql
mutation {
  setProfile(setProfileInput: { nickname: "test", email: "adoTest@gmail.com" }) {
    id
    email
    nickname
  }
}
```

# M createBalanceGameSelectionVote

```graphql
HTTP HEADERS
{
  "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NhaWxJZCI6MTcyMDM3MDE3OCwidXNlcklkIjoiMTg0NWI2MWUtM2NhMi00OWM4LWJkMDktNDA0Y2U5NzRkNTQ5IiwiaWF0IjoxNjIxMDU5MzgzLCJleHAiOjE2NTI1OTUzODN9.AiDa9DFGMAHyScvcYdKthWYpGgrtL6A0OrM7Wdu1T10"
}

mutation {
  createBalanceGameSelectionVote(
    createBalanceGameSelectionVoteInput: {
      balanceGameId: "a5bc45ff-9ba2-41ab-b8cb-3b8062ff0453"
      balanceGameSelectionId: "38196436-3029-48fd-8716-b40bb1c2a24c"
    }
  ) {
    id
    balanceGameId
  }
}
```

# Q balanceGame

```graphql
{
  balanceGame(id: "a5bc45ff-9ba2-41ab-b8cb-3b8062ff0453") {
    id
    balanceGameSelectionVotes {
      id
    }
  }
}
```

# createBalanceGameSelectionVoteLogined

```graphql
mutation {
  createBalanceGameSelectionVoteLogined(
    createBalanceGameSelectionVoteInput: {
      balanceGameId: "7309cd49-ca58-4f97-902a-074bb6e2d4b9"
      balanceGameSelectionId: "07ca3b1c-15f7-4c36-8322-aa85e17c188d"
    }
  ) {
    id
    userId
    totalVoteCount
    balanceGameSelections {
      voteCount
      order
    }
  }
}
```

# M removeBalanceGameSelectionVoteLogined

```grpahql
mutation {
  removeBalanceGameSelectionVoteLogined(balanceGameId: "7309cd49-ca58-4f97-902a-074bb6e2d4b9",
  ) {
    id
    userId
    totalVoteCount
    balanceGameSelections {
      id
      voteCount
    }

  }
}
```

# M createComment

```graphql
mutation {
  createComment(createCommentInput:{
    balanceGameId: "7309cd49-ca58-4f97-902a-074bb6e2d4b9",
    content:"첫번재 댓글"
    color: "블루"
  }) {
    id
    balanceGameId
    content
    color     // 없으면 디폴트로 빨강,
    createdAt
  }
}
```

# # createReply

```grahpql
mutation {
  createReply(createReplyInput: {
    commentId:"a36c0243-155a-454f-840d-3cddcfe65c7d",
    balanceGameId: "7309cd49-ca58-4f97-902a-074bb6e2d4b9"
    content: "둘째"
    color: "레드",
  }) {
    id
    userId
    balanceGameId
    content
    createdAt
  }
}
```

# Q commentsByGameId

```graphql
{
  commentsByGameId(gameId: "7309cd49-ca58-4f97-902a-074bb6e2d4b9") {
    id
    content
    color
    createdAt
    replies {
      id
      content
      color
      createdAt
    }
  }
}
```
