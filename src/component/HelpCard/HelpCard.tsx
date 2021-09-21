import React from "react";
import useUser from "../../context/UserProvider/useUser";
import { CodeReview } from "../../util/types";
import { CardContainer } from "./HelpCard.styles";
import CodeReviewNotExist from "./helpCards/CodeReviewNotExist";
import FirstVisit from "./helpCards/FirstVisit";
import LoginMode from "./helpCards/LoginMode";
import OfflineMode from "./helpCards/OfflineMode";
import SearchResultsNotExist from "./helpCards/SearchResultsNotExist";

interface Props {
  //codeReviews -> isCodeReviewExist 로 수정
  codeReviews: CodeReview[];
  searchKeyword: string;
  searchResults: CodeReview[];
}

const HelpCard = ({ codeReviews, searchResults, searchKeyword }: Props) => {
  const user = useUser();

  const getCardToShow = (): React.ReactNode => {
    if (codeReviews.length > 0 && searchKeyword.length > 0) {
      return <SearchResultsNotExist />;
    }

    if (!user.isLogin && codeReviews.length === 0) {
      return <FirstVisit />;
    }

    if (!user.isLogin) {
      return <OfflineMode />;
    }

    if (codeReviews.length === 0) {
      return <CodeReviewNotExist />;
    }

    return <LoginMode />;
  };

  return <CardContainer>{getCardToShow()}</CardContainer>;
};

export default HelpCard;
