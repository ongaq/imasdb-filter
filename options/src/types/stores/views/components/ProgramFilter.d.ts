import React from "react";

export type Error = null | true;
export type Html = '' | Document;
export type IsLoading = boolean;
export type TextareaData = string;
export type SaveActorsCount = number;
export type State = {
  error: Error;
  html: Html;
  isLoading: IsLoading;
  textareaData: TextareaData;
  saveActorsCount: SaveActorsCount;
};
export type Action = {
  type: string;
  error?: Error;
  html?: Html;
  isLoading?: IsLoading;
  textareaData?: TextareaData;
  saveActorsCount?: SaveActorsCount;
};
export type UseStates = State & {
  setError: (error: Error) => Action;
  setHtml: (html: Html) => Action;
  setLoading: (isLoading: IsLoading) => Action;
  setTextareaData: (textareaData: TextareaData) => Action;
  setActorsCount: (saveActorsCount: SaveActorsCount) => Action;
};
export type ProgramFilterReducer = {
  programFilterReducer: UseStates;
};