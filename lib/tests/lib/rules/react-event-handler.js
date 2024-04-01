"use strict";
const mocha = require("mocha");
const rule = require("../../../lib/rules/react-event-handler.js");
const { RuleTester } = require("@typescript-eslint/rule-tester");
// Set up cleanup after tests are done
RuleTester.afterAll = mocha.after;
const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
});
ruleTester.run("react-event-handler", rule, {
    // valid case has no errors
    valid: [
        {
            code: `const MyComponent=()=>{

            const handleMove= ()=>{}

                return (<div>
                    <div onClick={handleMove}></div>
                    </div>)
}
`,
        },
        {
            code: `
    export interface Props {
    isFeedUi: boolean;
}
const FeedContainer = memo(({ isFeedUi }: Props) => {
    
    const [, startTransition] = useTransition();

    const boardType = useRecoilValue(boardTypeSelector);

    const { search } = useLocation();

    const LnbMenu: Array<ILnbObj> = useMemo(
        () => boardType.map((board, i) => ({ type: i, name: board })),
        [boardType],
    );
    const initialState = () => LnbMenu[0].name;
    const [isClick, setIsClick] = useState(initialState);

    const saveIsClick = useMemo(() => isClick, [isClick]);

    const handleClick = useCallback(
        (type: string) => () => {
            if (isClick !== type) startTransition(() => setIsClick(type));
        },
        [isClick],
    );

    const fetchBoards = async ({ pageParam }) => {
        const res = await getBoards({
            type: isClick,
            page: pageParam,
            status: search.includes('sold') ? '품절' : '',
        });
        return res;
    };

    const { createObserver, disconnectObserver } = useIntersectionObserver(() => fetchNextPage());

    const { data, status, fetchNextPage } = useInfiniteQuery({
        queryKey: ['feedArr', isClick, search],
        queryFn: fetchBoards,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.pageValue.totalPage === 0) {
                disconnectObserver();
                return undefined;
            }
            if (lastPage.pageValue.totalPage === allPages.length) {
                disconnectObserver();
                return undefined;
            }

            return lastPageParam + 1;
        },
    });

    const feedListLen: number = data?.pages[0].pageValue.totalElements || 0;


    return (
        <S.FeedContainer>
            <Lnb handleClick={handleClick} isClick={saveIsClick as string} LnbMenu={LnbMenu} />
            {feedListLen === 0 && <EmptyFeedList />}
            {status === 'pending' ? (
                <S.FeedContents>
                    <Loading />
                </S.FeedContents>
            ) : status === 'error' ? (
                <S.FeedContents>에러가 발생하였습니다..</S.FeedContents>
            ) : (
                <>
                    {data?.pages.map((group) =>
                        group.contents?.map((data) => (
                            <Feed key={data.id} data={data} isFeedUi={isFeedUi} />
                        )),
                    )}
                    <div ref={createObserver} id='target'></div>
                </>
            )}
        </S.FeedContainer>
    );
});
FeedContainer.displayName = 'FeedContainer';
export default FeedContainer;
`,
        },
    ],
    invalid: [
        {
            code: `const MyComponent=()=>{
        const myFunc = () => {}
        const onHandle = () => () => {}

        return (
                <div>
                    <div onClick={() => {}}></div>
                </div>
                )
}`,
            // for an invalid case we list which messageIds (or any other reported data) should be present
            errors: [
                {
                    messageId: "reactEventHandler",
                },
            ],
        },
        {
            code: `const MyComponent=()=>{
        const myFunc = () => {}
        const onHandle = () => () => {}

        return (
                <div>
                   <div onClick={myFunc}></div>
                </div>
                )
}`,
            // for an invalid case we list which messageIds (or any other reported data) should be present
            errors: [
                {
                    messageId: "reactEventHandler",
                },
            ],
        },
        {
            code: `const MyComponent=()=>{
        const myFunc = () => {}
        const onHandle = () => () => {}

        return (
                <div>
                 <div onClick={onHandle}></div>;
                </div>
                )
}`,
            // for an invalid case we list which messageIds (or any other reported data) should be present
            errors: [
                {
                    messageId: "reactEventHandler",
                },
            ],
        },
    ],
});
