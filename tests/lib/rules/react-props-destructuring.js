const mocha = require("mocha");
const { RuleTester } = require("@typescript-eslint/rule-tester");
const rule = require("../../../lib/rules/react-props-destructuring.js");

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

ruleTester.run("함수형 컴포넌트의 props parameter 구조분해 할당", rule, {
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
  ],
  invalid: [
    {
      code: `
      interface Props {
        title: string;
        color: string;
        size: string;
        colorType: string;
      }
      const Components1 = ({title, color, size, colorType} : Props) => {
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
          messageId: "reactPropsDestructuring",
        },
      ],
    },
  ],
});
