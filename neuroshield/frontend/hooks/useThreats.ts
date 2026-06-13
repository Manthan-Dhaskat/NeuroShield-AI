"use client";

import { useEffect } from "react";
import { useThreatStore } from "@/store/threatStore";
import { threatService } from "@/services/threatService";

export const useThreats = () => {
  const { setThreats } = useThreatStore();

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const data =
          await threatService.getThreats();

        console.log(
          "THREATS RECEIVED:",
          data
        );

        setThreats(data);
      } catch (error) {
        console.error(
          "THREAT ERROR:",
          error
        );
      }
    };

    fetchThreats();
  }, [setThreats]);
};