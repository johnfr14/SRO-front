import { defaultCardData } from "../dataFunctions/fetchData"
import { ethers } from "ethers"
const axios = require("axios")

/****************************************
            Marketplace.sol
*****************************************/
//Query: https://api.thegraph.com/subgraphs/name/johnfr14/training-marketplace

// Fetch all nfts currently on sales
export const getNftOnSale = async () => {
    let result = await axios({
        url: 'https://api.thegraph.com/subgraphs/name/johnfr14/training-marketplace',
        method: 'post',
        data: {
            query: `
                query {
                    sales(where: {status: "1"}, orderBy: saleId, orderDirection: desc) 
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
    if (result.data.data === undefined) {
        result = {}
    } else {
        result = result.data.data.sales 
    }
    return result
}

// Fetch only the nfts put on sale by the user
export const onSaleOwned = async (address) => {
    
    let result 
    try {
    result = await axios({
        url: 'https://api.thegraph.com/subgraphs/name/johnfr14/training-marketplace',
        method: 'post',
        data: {
            query: `
                query {
                    user (id: "${address}") {
                        id
                        totalAmountSold
                        maxSold
                          Sales (where: {status: "1"}){
                          id
                          saleId
                          nftId
                          status
                          price
                          seller {id}
                          collection
                        }
                        totalSold
                      }
                }
            `
        }
    })
        if (result.data.data === undefined) {
            result = {}
        } else {
            result = result.data.data.user.Sales
        }
    } catch (error) {
        result = []
    }
    return result
}

/****************************************
                SRO.sol
*****************************************/
//Query: https://api.thegraph.com/subgraphs/name/johnfr14/training-marketplace-sro721


// fetch all the nfts created so far
export const nfts = async () => {
    const result = await axios({
        url: 'https://api.thegraph.com/subgraphs/name/johnfr14/training-marketplace-sro721',
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
        url: 'https://api.thegraph.com/subgraphs/name/johnfr14/training-marketplace-sro721',
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
        url: 'https://api.thegraph.com/subgraphs/name/johnfr14/training-marketplace-sro721',
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

// Fetch the nft by his id
export const getNftById = async (nftId) => {
    let result = null
    let sale = null
    result = await axios({
        url: 'https://api.thegraph.com/subgraphs/name/johnfr14/training-marketplace-sro721',
        method: 'post',
        data: {
            query: `
                query {
                    nft (id: "${nftId}") {
                        id
                        nftId
                        title
                        description
                        timeStamp
                        author {id}
                        owner {id}
                        royalties
                        likeCount
                        liked (where: {isLiked: true}){userAddress}
                        url    
                    }
                }
            `
        }
    })
    if (result.data.data === undefined) {
        result = {}
    } else {
        result = result.data.data.nft
    }

    sale = await axios({
        url: 'https://api.thegraph.com/subgraphs/name/johnfr14/training-marketplace',
        method: 'post',
        data: {
            query: `
                query {
                    sales (where: {nftId: "${result.nftId}", status: "1"}){
                        id
                        saleId
                        nftId
                        status
                        price
                        seller {id}
                        collection
                      }
                }
            `
        }
    })
    
    if (sale.data.data.sales.length > 0) {
        sale = sale.data.data.sales[0]
        sale.price = ethers.utils.formatEther(sale.price)
    } else {
        sale = defaultCardData.sale
    }

    return await {...result, sale: sale }
}