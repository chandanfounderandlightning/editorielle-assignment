'use client';

import {
  useEffect, useState, 
} from "react";

export function GetTimeDifference (created_at: any) {
  const [timeDifference, setTimeDifference] = useState(0);

  useEffect(() => {
    const createdTime = new Date(created_at).getTime(); 
    const currentTime = new Date().getTime();
    const difference = currentTime - createdTime;
    setTimeDifference(difference);
  }, [created_at]);

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  let formattedTime = '';
  if (days > 0) {
    formattedTime += `${days} day${days > 1 ? 's' : ''} `;
  }
  if (hours > 0) {
    formattedTime += `${hours} hour${hours > 1 ? 's' : ''} `;
  }
  if (minutes > 0) {
    formattedTime += `${minutes} minute${minutes > 1 ? 's' : ''} `;
  }
  if (seconds > 0) {
    formattedTime += `${seconds} second${seconds > 1 ? 's' : ''} `;
  }
  return {
    formattedTime,
  };
}
