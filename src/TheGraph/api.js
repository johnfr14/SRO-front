const axios = require("axios")

/****************************************
            Marketplace.sol
*****************************************/
//Query: https://api.thegraph.com/subgraphs/name/johnfr14/marketplace


export const getNftOnSale = async () => {
    const result = await axios({
        url: 'https://api.thegraph.com/subgraphs/name/johnfr14/marketplace',
        method: 'post',
        data: {
            query: `
                query {
                    sales(where: {status: 1}, orderBy: saleId, orderDirection: desc) 
                    {
                        id
                        saleId
                        nftId
                        status
                        price
                        seller
                        collection
                    }
                }
            `
        }
    })
    return result.data.data.sales
}

// Fetch only the nfts put on sale by the user
export const onSaleOwned = async (address) => {
    
    let result 
    try {
    result = await axios({
        url: 'https://api.thegraph.com/subgraphs/name/johnfr14/marketplace',
        method: 'post',
        data: {
            query: `
                query {
                    sales(where: {seller: "${address}", status: 1}, orderBy: id, orderDirection: asc) 
                    {
                        id
                        saleId
                        nftId
                        status
                        price
                        seller
                        collection
                    }
                }
            `
        }
    })
    result = result.data.data.sales
    } catch (error) {
        result = []
    }
    return result
}

/****************************************
                SRO.sol
*****************************************/
//Query: https://api.thegraph.com/subgraphs/name/johnfr14/sro


// fetch all the nfts created with all the datas existing
export const nfts = async () => {
    const result = await axios({
        url: 'https://api.thegraph.com/subgraphs/name/johnfr14/sro',
        method: 'post',
        data: {
        query: `
            query {
                nfts {
                    id
                    nftId
                    title
                    description
                    timeStamp
                    author {id}
                    owner {id}
                    royalties
                    likeCount
                    liked (where: {isLiked: true}){
                        userAddress
                    }
                    url
                  }
            }
        `
        }
    })
    return result.data.data.nfts
}

// Fetch only the nfts created by the user
export const created = async (address) => {
    let result 
    try {
    result = await axios({
        url: 'https://api.thegraph.com/subgraphs/name/johnfr14/sro',
        method: 'post',
        data: {
            query: `
                query {
                    user (id: "${address.toLowerCase()}"){
                        created {
                          id
                          nftId
                          title
                          description
                          timeStamp
                          author {id}
                          owner {id}
                          royalties
                          likeCount
                          liked (where: {isLiked: true}) {
                            userAddress
                          }
                          url
                        }
                    }
                }
            `
        }
    })
    } catch (error) {
        result = []
    }
    return result.data.data.user.created
}

// Fetch only the owned created by the user
export const owned = async (address) => {
    let result 
    try {
    result = await axios({
        url: 'https://api.thegraph.com/subgraphs/name/johnfr14/sro',
        method: 'post',
        data: {
            query: `
                query {
                    user (id: "${address.toLowerCase()}"){
                        owned {
                          id
                          nftId
                          title
                          description
                          timeStamp
                          author {id}
                          owner {id}
                          royalties
                          likeCount
                          liked (where: {isLiked: true}) {
                            userAddress
                          }
                          url
                        }
                    }
                }
            `
        }
    })
    } catch (error) {
        result = []
    }
    return result.data.data.user.owned
}