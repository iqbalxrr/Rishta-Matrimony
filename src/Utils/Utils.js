import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Axios Instance/axios";


// Fetch Functions
const fetchBiodatas = async () => {
  const res = await axiosInstance.get("/biodatas");
  return res.data;
};

const fetchPremiumMembers = async () => {
  const res = await axiosInstance.get("/all-premium-members");
  return res.data;
};

const fetchContactRequests = async () => {
  const res = await axiosInstance.get("/all-contact-request");
  return res.data;
};

const fetchSuccessStories = async () => {
  const res = await axiosInstance.get("/success-story");
  return res.data;
};

// Main Custom Hook
export const useDashboardStats = () => {
  const { data: biodatas = [], isLoading: isLoadingBiodata } = useQuery({
    queryKey: ["biodatas"],
    queryFn: fetchBiodatas,
  });

  const { data: premiumMembers = [], isLoading: isLoadingPremium } = useQuery({
    queryKey: ["premiumMembers"],
    queryFn: fetchPremiumMembers,
  });

  const { data: contactRequests = [], isLoading: isLoadingContact } = useQuery({
    queryKey: ["contactRequests"],
    queryFn: fetchContactRequests,
  });

  const { data: successStories = [], isLoading: isLoadingMarriage } = useQuery({
    queryKey: ["successStories"],
    queryFn: fetchSuccessStories,
  });

  // console.log(successStories)

  // Stats Calculation
  const totalBiodata = biodatas.length;
  const maleBiodata = biodatas.filter((b) => b.biodataType === "Male").length;
  const femaleBiodata = biodatas.filter((b) => b.biodataType === "Female").length;
  const premiumBiodata = premiumMembers.length;
  const totalRevenue = contactRequests.length * 5;
  const marriageCount = successStories.length;

  return {
    biodatas,
    premiumMembers,
    contactRequests,
    successStories,
    stats: {
      totalBiodata,
      maleBiodata,
      femaleBiodata,
      premiumBiodata,
      totalRevenue,
      marriageCount,
    },
    loading: isLoadingBiodata || isLoadingPremium || isLoadingContact || isLoadingMarriage,
  };
};
