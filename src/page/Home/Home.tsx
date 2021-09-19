import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { ReactComponent as SearchIcon } from "../../asset/icon/search.svg";
import Loading from "../../component/@common/Loading/Loading";
import HelpCard from "../../component/HelpCard/HelpCard";
import ReviewCard from "../../component/ReviewCard/ReviewCard";
import ReviewDetailModal from "../../component/ReviewDetailModal/ReviewDetailModal";
import useModal from "../../context/modalProvider/useModal";
import usePullRequestURLs from "../../context/PullRequestURLProvider/usePullRequestURLs";
import useCodeReviews from "../../hook/useCodeReviews";
import useDebounce from "../../hook/useDebounce";
import useIntersectionObserver from "../../hook/useIntersectionObserver";
import { CodeReview } from "../../util/types";
import {
  HomeContents,
  LoadingContainer,
  ObservedElement,
  ReviewCardButton,
  SearchContainer,
  SearchInput,
  SearchLabel,
  SubTitleContainer,
} from "./Home.styles";

const Home = () => {
  const {
    data: codeReviews,
    readAdditionalReviews,
    isPageEnded,
    isLoading,
    findByKeyword,
  } = useCodeReviews();
  const {
    pullRequestURLs,
    resetFailedURLs,
    refetchURLs,
  } = usePullRequestURLs();
  const modal = useModal();
  const [searchResults, setSearchResults] = useState<CodeReview[]>([]);
  const searchKeyword = useRef("");
  const searchedCodeReviewPageNumber = useRef(1);
  const {
    observedElementRef: recommendedReviewInfinityScroll,
  } = useIntersectionObserver({
    callback: readAdditionalReviews,
    observedElementDeps: [isLoading, searchResults.length === 0],
  });
  const [isSearchedPageEnded, setIsSearchedPageEnded] = useState(false);
  const { registerDebounceCallback } = useDebounce({ waitingTimeMs: 250 });

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    searchedCodeReviewPageNumber.current = 1;
    setIsSearchedPageEnded(false);
    searchKeyword.current = event.target.value;

    registerDebounceCallback(async () => {
      const foundReviews = await findByKeyword({
        keyword: searchKeyword.current,
        pageNumber: searchedCodeReviewPageNumber.current,
      });
      setSearchResults(foundReviews);
    });
  };

  const findAdditionalReviews = async () => {
    if (isSearchedPageEnded) {
      return;
    }

    searchedCodeReviewPageNumber.current++;

    const foundReviews = await findByKeyword({
      keyword: searchKeyword.current,
      pageNumber: searchedCodeReviewPageNumber.current,
    });

    if (foundReviews.length === 0) {
      setIsSearchedPageEnded(true);
      return;
    }

    setSearchResults((prevResult) => [...prevResult, ...foundReviews]);
  };

  const {
    observedElementRef: searchedReviewInfinityScroll,
  } = useIntersectionObserver({
    callback: findAdditionalReviews,
    observedElementDeps: [isLoading, searchResults.length > 0],
  });

  useEffect(() => {
    if (codeReviews.length === 0) return;

    if (pullRequestURLs.length === 0) return;

    if (pullRequestURLs.some((pullRequestURL) => pullRequestURL.isFailedURL)) {
      resetFailedURLs().then(() => {
        refetchURLs();
      });
    }
  }, [codeReviews, pullRequestURLs]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  return (
    <div>
      <SearchContainer>
        <SearchIcon />
        <SearchLabel>search</SearchLabel>
        <SearchInput
          type="search"
          placeholder="코드 리뷰 내용을 검색할 수 있어요"
          onChange={handleChangeInput}
        />
      </SearchContainer>
      <HomeContents>
        {searchResults.length === 0 && (
          <>
            <HelpCard
              searchKeyword={searchKeyword.current}
              searchResults={searchResults}
              codeReviews={codeReviews}
            />
            {codeReviews.length > 0 && (
              <>
                <SubTitleContainer>
                  <h2>😊 코드 리뷰를 둘러보는 건 어떠세요?</h2>
                  <p>저장된 리뷰를 랜덤으로 보여드릴게요</p>
                </SubTitleContainer>
                {codeReviews.map((review) => (
                  <ReviewCardButton
                    key={review.id}
                    onClick={() => {
                      modal.openModal(<ReviewDetailModal review={review} />);
                    }}
                  >
                    <ReviewCard codeReview={review} />
                  </ReviewCardButton>
                ))}
                {isPageEnded && (
                  <SubTitleContainer>
                    <h2>🤩 저장된 리뷰는 여기까지예요</h2>
                  </SubTitleContainer>
                )}
                <ObservedElement
                  ref={recommendedReviewInfinityScroll}
                ></ObservedElement>
              </>
            )}
          </>
        )}
        {searchResults.length > 0 && (
          <>
            {searchResults.map((searchResult) => {
              return (
                <ReviewCardButton
                  key={searchResult.id}
                  onClick={() => {
                    modal.openModal(
                      <ReviewDetailModal review={searchResult} />
                    );
                  }}
                >
                  <ReviewCard
                    codeReview={searchResult}
                    className="review-card"
                  />
                </ReviewCardButton>
              );
            })}
            {isSearchedPageEnded && (
              <SubTitleContainer>
                <h2>🔬 검색된 리뷰는 여기까지예요</h2>
              </SubTitleContainer>
            )}
            <ObservedElement
              ref={searchedReviewInfinityScroll}
            ></ObservedElement>{" "}
          </>
        )}
      </HomeContents>
    </div>
  );
};

export default Home;
