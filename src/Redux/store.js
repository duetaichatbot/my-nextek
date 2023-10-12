import { configureStore } from "@reduxjs/toolkit";
import { auth } from "./UserSlice/UserSlice";
import { institute } from "./institute/Institute";
import { posts } from "./posts/Posts";
import { jobs } from "./jobs/Jobs";
import { sharePosts } from "./share/Share";
import { interestCards } from "./interestCard/InterestCards";
import { chats } from "./chat/Chat";
import { stripeSlice } from "./stripeSlice/Striple";

const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    [institute.reducerPath]: institute.reducer,
    [posts.reducerPath]: posts.reducer,
    [jobs.reducerPath]: jobs.reducer,
    [sharePosts.reducerPath]: sharePosts.reducer,
    [interestCards.reducerPath]: interestCards.reducer,
    [chats.reducerPath]: chats.reducer,
    [stripeSlice.reducerPath]: stripeSlice.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware()
      .concat(auth.middleware)
      .concat(institute.middleware)
      .concat(posts.middleware)
      .concat(jobs.middleware)
      .concat(sharePosts.middleware)
      .concat(interestCards.middleware)
      .concat(chats.middleware)
      .concat(stripeSlice.middleware),
});

export default store;
