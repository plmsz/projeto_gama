import styled from 'styled-components';
import * as Tabs from '@radix-ui/react-tabs';

export const StyledTabs = styled(Tabs.Root)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const StyledList = styled(Tabs.List)`
    flex-shrink: 0;
    display: flex;
    border-bottom: 1px solid #4CFBC6;
    min-width: 80%;
`;
export const StyledTrigger = styled(Tabs.Trigger)`
    all: unset;
    font-family: Staatliches;
    background-color: white;
    padding: 0 25px;
    height: 2rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    letter-spacing: 2px;
    line-height: 1.2rem;
    color: #74ccf8;
    user-select: none; 
    &:first-child { 
        border-top-left-radius: 6px;
        background-color: #F8F7FF;
    };
    &:last-child { 
        background-color: #F8F7FF;
        border-top-right-radius: 6px; 
    };
    &:hover {
        color: #00a6fb;
    };
    &[data-state=active] {
        color: #00a6fb;
    };
`;

export const StyledContent = styled(Tabs.Content)`
    flex-grow: 1;
    outline: none;
`;
