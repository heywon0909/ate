"use strict";
const mocha = require("mocha");
const { RuleTester } = require("@typescript-eslint/rule-tester");
const rule = require("../../../lib/rules/ts-naming-interface.js");
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
ruleTester.run("typescript interface definition", rule, {
    // valid case has no errors
    valid: [
        {
            code: `interface IUserInfo{
        name:string
      }`,
        },
        {
            code: `interface Props {
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
export default ShortFeedTheme;`,
        },
    ],
    invalid: [
        {
            code: `interface UserInfo{
        name:string
      }`,
            // for an invalid case we list which messageIds (or any other reported data) should be present
            errors: [
                {
                    messageId: "tsNamingInterface",
                },
            ],
        },
        {
            code: `
         interface IProps {
          foo: string;
        }
        const Hello = ({foo}: IProps) => {
            return <div>Hello {foo}</div>;
        };`,
            // for an invalid case we list which messageIds (or any other reported data) should be present
            errors: [
                {
                    messageId: "tsNamingInterface",
                },
            ],
        },
    ],
});
