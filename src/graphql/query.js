import { gql } from "@apollo/client";

const SignIn = gql`
  query SignIn($walletAddress: String) {
    signIn(walletAddress: $walletAddress) {
      isPrimary
      address
      _id
      user {
        _id
        displayName
        username
        avatar_url
        about_details
        bg_image
        twitterUrl
        facebookUrl
        isVerified
      }
    }
  }
`;

const UserDetails = gql`
  query User($walletAddress: String) {
    user(walletAddress: $walletAddress) {
      _id
      displayName
      username
      avatar_url
      about_details
      bg_image
      twitterUrl
      facebookUrl
      firstname
      lastname
      websiteUrl
      isVerified
      following_list {
        _id
      }
      follower_list {
        _id
      }
      nfts {
        _id
        name
        tokenId
        ipfsUrl
        imageUrl
        category
        chainId
        network
        ownerAddress
        creatorAddress
        isMarketPlace
        isApproved
        price
        contractAddress
      }
    }
  }
`;

const GetNftsOfUser = gql`
  query GetNftsOfUser($ownerAddress: String) {
    getNftsOfUser(ownerAddress: $ownerAddress) {
      _id
      name
      tokenId
      ipfsUrl
      imageUrl
      category
      chainId
      network
      ownerAddress
      creatorAddress
      isMarketPlace
      isApproved
      price
    }
  }
`;

const GetNftDetails = gql`
  query GetNftDetails($contractAddress: String, $tokenId: Int) {
    getNftDetails(contractAddress: $contractAddress, tokenId: $tokenId) {
      user {
        _id
        username
        avatar_url
        isVerified
      }

      _id
      name
      tokenId
      ipfsUrl
      imageUrl
      category
      chainId
      network
      ownerAddress
      creatorAddress
      isMarketPlace
      isApproved
      price
      contractAddress
    }
  }
`;

const GetPopularCreators = gql`
  query AllCreators($popularCollection: String) {
    allArtist(popularCollection: $popularCollection) {
      popularCollection
      users {
        _id
        username
        avatar_url
        bg_image
        isVerified
        wallets {
          _id
        }
        following_list {
          _id
        }
        follower_list {
          _id
        }
        nfts {
          _id
        }
      }
    }
  }
`;

const GetAllNfts = gql`
  query Nfts {
    nfts {
      _id
      name
      tokenId
      ipfsUrl
      imageUrl
      category
      chainId
      network
      ownerAddress
      creatorAddress
      isMarketPlace
      isApproved
      price
      contractAddress
      ownerUserId {
        _id
        username
        avatar_url
      }
    }
  }
`;
const GetAllUsers = gql`
  query Users {
    users {
      username
      avatar_url
      isVerified
      wallets {
        address
      }
      _id
      displayName
      about_details
      bg_image
      twitterUrl
      facebookUrl
      firstname
      lastname
      websiteUrl
    }
  }
`;

const WalletId = gql`
  query WalletId($walletId: String) {
    walletId(walletId: $walletId) {
      _id
      address
    }
  }
`;
const Wallet = gql`
  query Wallet($address: String) {
    wallet(address: $address) {
      _id
      address
      isPrimary
      user {
        _id
      }
    }
  }
`;
const NftUpdate = gql`
  mutation NftUpdate($price: Float, $nftId: String) {
    nftUpdate(price: $price, nftId: $nftId) {
      _id
      name
      tokenId
      ipfsUrl
      imageUrl
      category
      chainId
      network
      ownerAddress
      creatorAddress
      isMarketPlace
      isApproved
      price
      contractAddress
    }
  }
`;
const FilterNfts = gql`
  query FilterNfts(
    $priceMin: Float
    $priceMax: Float
    $network: String
    $category: String
    $isListed: Boolean
  ) {
    filterNfts(
      price_min: $priceMin
      price_max: $priceMax
      network: $network
      category: $category
      isListed: $isListed
    ) {
      _id
      name
      tokenId
      ipfsUrl
      imageUrl
      category
      chainId
      network
      ownerAddress
      creatorAddress
      isMarketPlace
      isApproved
      price
      contractAddress
      isListed
    }
  }
`;

const GetNFTObjectId = gql`
  query GetNFTObjectId($tokenId: Int, $network: String) {
    getNFTObjectId(tokenId: $tokenId, network: $network) {
      _id
      name
    }
  }
`;

const FeatureNft = gql`
  query AllFeatureNft($popularCollection: String) {
    allFeatureNft(popularCollection: $popularCollection) {
      popularCollection
      featuredNft {
        _id
        name
        category
        tokenId
        imageUrl
        ipfsUrl
        chainId
        network
        ownerAddress
        creatorAddress
        isMarketPlace
        isApproved
        price
        contractAddress
      }
    }
  }
`;
const TrendingNft = gql`
  query AllTrendingNft($popularCollection: String) {
    allTrendingNft(popularCollection: $popularCollection) {
      popularCollection
      trendingNft {
        _id
        name
        tokenId
        ipfsUrl
        imageUrl
        category
        chainId
        network
        ownerAddress
        creatorAddress
        isMarketPlace
        isApproved
        price
        contractAddress
      }
    }
  }
`;
const BannerNft = gql`
  query BannerNft($popularCollection: String) {
    bannerNft(popularCollection: $popularCollection) {
      popularCollection
      bannerNft {
        _id
        name
        tokenId
        ipfsUrl
        imageUrl
        category
        chainId
        network
        ownerAddress
        creatorAddress
        isMarketPlace
        isApproved
        price
        contractAddress
      }
    }
  }
`;
const GetRole = gql`
  query GetRole($id: String) {
    getRole(_id: $id) {
      _id
      royalty
      roleName
      royaltyAddress
    }
  }
`;
export {
  SignIn,
  Wallet,
  WalletId,
  GetRole,
  NftUpdate,
  FilterNfts,
  FeatureNft,
  TrendingNft,
  GetAllNfts,
  UserDetails,
  GetNftsOfUser,
  BannerNft,
  GetNftDetails,
  GetNFTObjectId,
  GetPopularCreators,
  GetAllUsers,
};
