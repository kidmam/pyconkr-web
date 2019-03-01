import React from 'react'
import styled from '@emotion/styled';
import intl from 'react-intl-universal';

const StyledP = styled.p`
`

interface Props {
  intlKey?: string;
  bold?: boolean;
  children: string;
}

export const Paragraph: React.SFC<Props> = ({ intlKey,  children, bold}) =>
  <StyledP>
    {bold ? <b>{intlKey
      ? intl.get(intlKey).defaultMessage(children)
      : children
    }</b> : intlKey
      ? intl.get(intlKey).defaultMessage(children)
      : children
    }
  </StyledP>