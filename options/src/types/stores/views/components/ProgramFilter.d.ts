import React from "react";

export type Error = null | true;
export type Html = '' | Document;
export type IsLoading = boolean;
export type IsSaved = boolean;
export type TextareaData = string[] | [];
export type SaveActorsCount = number;
export type SetError = (error: Error) => Action;
export type SetHtml = (html: Html) => Action;
export type SetLoading = (isLoading: IsLoading) => Action;
export type SetSaved = (isSaved: IsSaved) => Action;
export type SetTextareaData = (textareaData: TextareaData) => Action;
export type SetActorsCount = (saveActorsCount: SaveActorsCount) => Action;

export type State = {
  error: Error;
  html: Html;
  isLoading: IsLoading;
  isSaved: IsSaved;
  textareaData: TextareaData;
  saveActorsCount: SaveActorsCount;
};
export type Action = {
  type: string;
  error?: Error;
  html?: Html;
  isLoading?: IsLoading;
  isSaved?: IsSaved;
  textareaData?: TextareaData;
  saveActorsCount?: SaveActorsCount;
};
export type Dispatch = {
  setError: SetError;
  setHtml: SetHtml;
  setLoading: SetLoading;
  setSaved: SetSaved;
  setTextareaData: SetTextareaData;
  setActorsCount: SetActorsCount;
};
// export type 
export type UseStates = State & Dispatch;
export type AutoInputType = {
  error: Error;
  html: Html;
  isLoading: IsLoading;
  textareaData: TextareaData;
  saveActorsCount: SaveActorsCount;
  setError: (error: Error) => Action;
  setHtml: (html: Html) => Action;
  setLoading: (isLoading: IsLoading) => Action;
  setTextareaData: (textareaData: TextareaData) => Action;
  setActorsCount: (saveActorsCount: SaveActorsCount) => Action;
};
export type ProgramFilterReducer = {
  programFilterReducer: UseStates;
};