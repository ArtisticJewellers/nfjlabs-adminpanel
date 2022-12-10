import { gql } from "@apollo/client";

const UpdateProfile = gql`
  mutation UpdateUser(
    $userId: String
    $lastname: String
    $firstname: String
    $username: String
    $avatarUrl: String
    $bgImage: String
    $aboutDetails: String
    $twitterUrl: String
    $facebookUrl: String
    $websiteUrl: String
  ) {
    updateUser(
      userId: $userId
      lastname: $lastname
      firstname: $firstname
      username: $username
      avatar_url: $avatarUrl
      bg_image: $bgImage
      about_details: $aboutDetails
      twitterUrl: $twitterUrl
      facebookUrl: $facebookUrl
      websiteUrl: $websiteUrl
    ) {
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
    }
  }
`;
const Register = gql`
  mutation SignUp(
    $walletAddress: String
    $lastname: String
    $firstname: String
    $username: String
    $avatarUrl: String
    $bgImage: String
    $twitterUrl: String
    $aboutDetails: String
    $facebookUrl: String
    $websiteUrl: String
  ) {
    signUp(
      walletAddress: $walletAddress
      lastname: $lastname
      firstname: $firstname
      username: $username
      avatar_url: $avatarUrl
      bg_image: $bgImage
      twitterUrl: $twitterUrl
      about_details: $aboutDetails
      facebookUrl: $facebookUrl
      websiteUrl: $websiteUrl
    ) {
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
    }
  }
`;
const CreateNft = gql`
  mutation CreateNft(
    $chainId: Int
    $imageUrl: String
    $ipfsUrl: String
    $tokenId: Int
    $name: String
    $network: String
    $ownerAddress: String
    $creatorAddress: String
    $contractAddress: String
    $category: String
  ) {
    createNft(
      chainId: $chainId
      imageUrl: $imageUrl
      ipfsUrl: $ipfsUrl
      tokenId: $tokenId
      name: $name
      network: $network
      ownerAddress: $ownerAddress
      creatorAddress: $creatorAddress
      contractAddress: $contractAddress
      category: $category
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
      ownerUserId {
        _id
      }
    }
  }
`;
const FollowUser = gql`
  mutation FollowUser($followId: String, $userId: String) {
    followUser(followId: $followId, userId: $userId) {
      _id
      username
      avatar_url
      about_details
      bg_image
    }
  }
`;
const AddTrendingNft = gql`
  mutation AddTrendingNft($popularCollectionId: String, $nftId: String) {
    addTrendingNft(popularCollectionId: $popularCollectionId, nftId: $nftId) {
      popularCollection
      trendingNft {
        _id
      }
    }
  }
`;
const AddCreator = gql`
  mutation AddCreator($userId: String, $popularCollectionId: String) {
    addCreator(userId: $userId, popularCollectionId: $popularCollectionId) {
      popularCollection
      users {
        _id
      }
    }
  }
`;
const AddFeatureNft = gql`
  mutation AddFeatureNft($popularCollectionId: String, $nftId: String) {
    addFeatureNft(popularCollectionId: $popularCollectionId, nftId: $nftId) {
      popularCollection
      featuredNft {
        _id
      }
    }
  }
`;
const RemoveFeatureNft = gql`
  mutation RemoveFeatureNft($popularCollection: String, $nftId: String) {
    removeFeatureNft(popularCollection: $popularCollection, nftId: $nftId) {
      popularCollection
      featuredNft {
        _id
        name
        tokenId
      }
    }
  }
`;
const RemoveTrendingNft = gql`
  mutation RemoveTrendingNft($popularCollection: String, $nftId: String) {
    removeTrendingNft(popularCollection: $popularCollection, nftId: $nftId) {
      popularCollection
      trendingNft {
        _id
        name
        tokenId
      }
    }
  }
`;
const RemoveBannerNft = gql`
  mutation RemoveBannerNft($popularCollection: String, $nftId: String) {
    removeBannerNft(popularCollection: $popularCollection, nftId: $nftId) {
      popularCollection
      bannerNft {
        name
        tokenId
        _id
      }
    }
  }
`;
const NftApproved = gql`
  mutation NftApproved($nftId: String, $isApproved: Boolean) {
    nftApproved(nftId: $nftId, isApproved: $isApproved) {
      isApproved
      name
      tokenId
      ipfsUrl
    }
  }
`;
const VerifyUser = gql`
  mutation VerifyUser($userId: String, $isVerified: Boolean) {
    verifyUser(userId: $userId, isVerified: $isVerified) {
      _id
      displayName
      avatar_url
      username
      about_details
    }
  }
`;
const RemoveArtist = gql`
  mutation RemoveArtist($popularCollection: String, $userId: String) {
    removeArtist(popularCollection: $popularCollection, userId: $userId) {
      popularCollection
    }
  }
`;
const RoleRoyaltyUpdate = gql`
  mutation RoleRoyaltyUpdate($id: String, $royalty: Int) {
    roleRoyaltyUpdate(_id: $id, royalty: $royalty) {
      _id
      roleName
      royalty
    }
  }
`;
const RoleRoyaltyAddressUpdate = gql`
  mutation RoleRoyaltyAddressUpdate($id: String, $royaltyAddress: String) {
    roleRoyaltyAddressUpdate(_id: $id, royaltyAddress: $royaltyAddress) {
      _id
      roleName
      royalty
      royaltyAddress
    }
  }
`;
export {
  UpdateProfile,
  Register,
  CreateNft,
  FollowUser,
  AddTrendingNft,
  AddFeatureNft,
  AddCreator,
  RemoveFeatureNft,
  RemoveTrendingNft,
  RemoveBannerNft,
  NftApproved,
  VerifyUser,
  RoleRoyaltyUpdate,
  RemoveArtist,
  RoleRoyaltyAddressUpdate,
};
