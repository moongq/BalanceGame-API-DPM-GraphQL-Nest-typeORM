# balanceGame 생성하기 seleciton과 category 입력 가능.

# M createBalanceGame

```graphql
mutation {
  createBalanceGame(
    createBalanceGameInput: {
      userId: "05c508f7-f59d-45ea-b4a8-6452a2c6ba93"
      description: "this is balancegame1"
      balanceGameSelections: [
        { description: "Desciption1", subText: "Subtext1", textColor: "ff1323", order: 1 }
        { description: "Desciption2", subText: "Subtext2", textColor: "ff1323", order: 2 }
      ]
      balanceGameKeywords: [{ name: "카테고리1ㅣ" }, { name: "카테고리2" }]
    }
  ) {
    id
    description
    balanceGameSelections {
      id
      description
      subText
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
          subText: "www"
          textColor: "ff1323"
          backgroundColor: "der222"
          backgroundImage: "http~"
          order: 1
        }
        {
          id: "b3c0e407-e510-476a-89c8-dba29653ed8a"
          description: "change desc2"
          subText: "Subtext22"
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
      subText
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

value: {  "query": "mutation UploadFile($file1:Upload!) { uploadFile(file1:$file1) }", "variables": { "file1": null}}

key: map

value: { "0": ["variables.file1"] , "1": ["variables.file2"]}

key: 0 

value: 파일
