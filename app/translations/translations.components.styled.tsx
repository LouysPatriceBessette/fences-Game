import { styled } from "styled-components";

export const Bold = ({children}: {children: React.ReactNode}) => <b style={{fontSize: '1.1em'}}>{children}</b>

export const Italic = ({children}: {children: React.ReactNode}) => <i style={{fontStyle: 'italic'}}>{children}</i>

export const Apos = () => <>&apos;</>

export const Quot = () => <>&quot;</>

export const Hr = styled.hr`
  border: none;
  width: 80%;
  border-top: 1px solid #4d4c4cff;
  margin: 1em 0;
`

const AnchorStyled = styled.a`
  color: #5a79f1ff;
  // text-decoration: none;
  cursor: pointer;
`

export const Anchor = ({children, href}: {children: React.ReactNode, href: string}) => <AnchorStyled href={href} target='_blank'>{children}</AnchorStyled>