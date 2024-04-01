const mocha = require("mocha");
const { RuleTester } = require("@typescript-eslint/rule-tester");
const rule = require("../../../lib/rules/react-props-name.js");

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

ruleTester.run("함수형 컴포넌트의 props 이름 정의", rule, {
  // valid case has no errors
  valid: [
    {
      code: `
         interface Props {
        data: IBoardContent;
    }
    const ShortFeedTheme = ({ data }: Props) => {
        const { id, title, createTime } = data;
        const navigate = useNavigate();
        const handleMoveDetail = () => {}

        return (
            <S.FeedContainer $isFeedUi={true} id='short-feed'>
                <S.FeedWrapper $isFeedUi={true}>
                    <S.FeedTitleWrapper onClick={handleMoveDetail}>
                        <SubTitle text={title} lan='KR' />
                    </S.FeedTitleWrapper>
                    <S.FeedButtonWrapper>
                        <CaptionTag text='sold out' as='M' color={theme.color.purple[500]} />|
                        <S.FeedButton>
                            <Icon name='i-message' color='#d9d9d9' />
                            <CaptionTag text={'10'} as='M' color='#d9d9d9' />
                        </S.FeedButton>
                    </S.FeedButtonWrapper>
                </S.FeedWrapper>

                <S.FeedDate>
                    <CaptionTag as='M' text={createTime} />
                </S.FeedDate>
            </S.FeedContainer>
        );
    };
    export default ShortFeedTheme;
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
    {
      code: `const renderWithCustomStyled = async (ui: React.ReactElement, options?: RenderOptions) =>
    await act(() => render(ui, { wrapper: Wrapper, ...options }));`,
    },
    {
      code: `const useIntersectionObserver = (fetchCallBack: () => void) => {
    const observer = useRef<IntersectionObserver>();

    const createObserver = useCallback((ref: HTMLDivElement) => {
        if (ref == null) return;
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        };
        const callback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                    fetchCallBack();
                }
            });
        };

        observer.current = new IntersectionObserver(callback, observerOptions);
        observer.current.observe(ref);
        return ref;
    }, []);

    const disconnectObserver = useCallback(() => {
        if (observer.current != null) {
            observer.current.disconnect();
        }
    }, [observer]);

    return { observer, createObserver, disconnectObserver };
};`,
    },
  ],
  invalid: [
    {
      code: `
      interface IBoardProps {
        title: string;
        color: string;
        size: string;
        colorType: string;
      }
      const Components1 = ({title, color, size, colorType} : IBoardProps) => {
            return(
                <div>
                <div>{title}</div>
                <div>{color}</div> 
                <div>{size}</div> 
                <div>{colorType}</div>
                </div>
            )
    };
`,
      // for an invalid case we list which messageIds (or any other reported data) should be present
      errors: [
        {
          messageId: "reactPropsName",
        },
      ],
    },
  ],
});
