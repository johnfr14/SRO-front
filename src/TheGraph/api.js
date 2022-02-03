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
export const nfts = () => {

    axios({
        url: 'https://api.thegraph.com/subgraphs/name/johnfr14/sro',
        method: 'post',
        data: {
        query: `
            query {
                nfts {
                    id
                    author
                    owner
                    timeStamp
                    royalties
                    likes
                    isLiked
                    title
                    description
                    tokenURI
                }
            }
        `
    }
    }).then((result) => {
        console.log(result.data)
    });
}