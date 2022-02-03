const axios = require("axios")

//Marketplace.sol
export const onSale = async () => {
    const result = await axios({
        url: 'https://api.thegraph.com/subgraphs/id/QmdTJ5vrWPN8sKKBdQESWTm71EpZH92HUc91cyCVEuVFgm',
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

// SRO721.sol
export const nfts = async () => {
    const result = await axios({
        url: 'https://api.thegraph.com/subgraphs/id/QmQTVV1oDvedYSafqrDsR2eUnDbdhP2gLdG5jhXaQWdpxv',
        method: 'post',
        data: {
        query: `
            query {
                nfts (orderBy: nftId, orderDirection: asc) {
                    id
                    nftId
                    author
                    owner
                    timeStamp
                    royalties
                    likes
                    isLiked
                    title
                    description
                    url
                }
            }
        `
        }
    })
    return result.data.data.nfts
}