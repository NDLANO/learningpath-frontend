/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from "redux-actions";
import { routerActions } from "react-router-redux";
import {
  fetchPath,
  createPath,
  deletePath,
  updatePath,
  copyPath,
  updateStatus,
  activateDeletedPath,
} from "../sources/learningpaths";
import { applicationError, addMessage } from "../messages/messagesActions";
// eslint-disable-next-line import/no-cycle
import { createEmptyLearningPathStep } from "./step/learningPathStepActions";
import polyglot from "../i18n";
import { fetchLearningPathImageWithMetaUrl, setSelectedImage, setSavedImage } from "../imageSearch/imageActions";
import { fetchMyLearningPaths } from "../myPage/myPageActions";
import redirectAction from "../util/redirectAction";

export const setLearningPath = createAction("SET_LEARNING_PATH");
export const setLearningPathsStatus = createAction("UPDATE_LEARNING_PATHS_STATUS");
export const removeLearningPath = createAction("REMOVE_LEARNING_PATH");
export const setLearningPathStatus = createAction("UPDATE_LEARNING_PATH_STATUS");
export const setLearningPathRevision = createAction("UPDATE_LEARNING_PATH_REVISION");

function canAccessLearningPath(path, isEdit = false, dispatch) {
  if (isEdit && !path.canEdit) {
    dispatch(
      routerActions.push({
        pathname: "/forbidden",
      }),
    );
  }
}

function fetchIsBasedOnPath(path) {
  return (dispatch, getState) =>
    fetchPath({ pathId: path.isBasedOn }, getState().locale)
      .then((isBasedOnPath) => {
        dispatch(
          setLearningPath({
            ...path,
            isBasedOnTitle: isBasedOnPath.title.title,
          }),
        );
      })
      .catch(() => {});
}

export function fetchLearningPath(pathId, isEdit = false) {
  return (dispatch, getState) =>
    fetchPath({ pathId }, getState().locale)
      .then((path) => {
        canAccessLearningPath(path, isEdit, dispatch);
        dispatch(setLearningPath(path));
        return path;
      })
      .then((path) => {
        if (path.coverPhoto) {
          dispatch(fetchLearningPathImageWithMetaUrl(path.coverPhoto.metaUrl));
        } else {
          dispatch(setSavedImage({}));
          dispatch(setSelectedImage({}));
        }
        if (path.isBasedOn) {
          dispatch(fetchIsBasedOnPath(path));
        }
        return path;
      })
      .catch((err) => {
        if (err.status === 403) {
          return dispatch(redirectAction("push", err, "/forbidden"));
        }
        if (err.status === 404) {
          return dispatch(redirectAction("push", err, "/notfound"));
        }
        return err;
      });
}

export function createEmptyLearningPath() {
  return setLearningPath({
    title: {},
    description: {},
    learningsteps: [],
    duration: 1, // https://support.knowit.no/support/browse/NDLA-198
    coverPhotoMetaUrl: "",
  });
}

export function createLearningPath(learningPath) {
  return (dispatch) =>
    new Promise((resolve, reject) =>
      createPath({}, learningPath)
        .then((lpath) => {
          dispatch(
            addMessage({
              message: polyglot.t("createLearningPath.createdMsg"),
            }),
          );
          dispatch(setLearningPath(lpath));
          dispatch(createEmptyLearningPathStep());
          dispatch(
            routerActions.push({
              pathname: `/learningpaths/${lpath.id}/step/new`,
            }),
          );
          resolve();
        })
        .catch((err) => {
          dispatch(applicationError(err));
          if (err.status === 403) {
            dispatch(
              addMessage({
                message: polyglot.t("createLearningPath.notAllowed"),
                severity: "danger",
                timeToLive: 10000,
              }),
            );
          }
          reject();
        }),
    );
}

export function updateLearningPath(pathId, learningPath, redirectUrl = `/learningpaths/${pathId}`) {
  return (dispatch) =>
    new Promise((resolve, reject) =>
      updatePath({ pathId }, learningPath)
        .then((lpath) => {
          dispatch(
            addMessage({
              message: polyglot.t("updateLearningPath.updatedMsg"),
            }),
          );
          dispatch(setLearningPath(lpath));
          dispatch(
            routerActions.push({
              pathname: redirectUrl,
            }),
          );
          resolve();
        })
        .catch((err) => {
          dispatch(applicationError(err));
          if (err.status === 403) {
            dispatch(
              addMessage({
                message: polyglot.t("updateLearningPath.notAllowed"),
                severity: "danger",
                timeToLive: 10000,
              }),
            );
          }
          reject();
        }),
    );
}
export function activateDeletedLearningPath(pathId, status) {
  return (dispatch) => activateDeletedPath({ pathId, status }).then(() => dispatch(fetchMyLearningPaths()));
}
export function deleteLearningPath(learningPath) {
  return (dispatch) =>
    deletePath({ pathId: learningPath.id })
      .then(dispatch(removeLearningPath(learningPath.id)))
      .then(
        dispatch(
          addMessage({
            message: "Angre sletting?",
            timeToLive: 7000,
            severity: "info",
            action: {
              title: polyglot.t("learningPathStep.messages.delete.action"),
              onClick: () => dispatch(activateDeletedLearningPath(learningPath.id, learningPath.status)),
            },
          }),
        ),
      );
}

function updateLPStatus(pathId, status, redirectUrl, setStatus, rejectMessage) {
  return (dispatch) =>
    updateStatus({ pathId }, { status, message: rejectMessage })
      .then((lpath) => {
        dispatch(setLearningPathRevision(lpath));
        dispatch(setStatus);
        dispatch(
          addMessage({
            message: polyglot.t(`updateLearningPathStatus.${status}`),
            timeToLive: 3000,
          }),
        );
        if (redirectUrl) {
          dispatch(
            routerActions.push({
              pathname: redirectUrl,
            }),
          );
        }
      })
      .catch((err) => {
        dispatch(applicationError(err));
        if (err.status === 403) {
          dispatch(
            addMessage({
              message: polyglot.t("updateLearningPath.notAllowed"),
              severity: "danger",
              timeToLive: 10000,
            }),
          );
        }
      });
}

export function updateLearningPathsStatus(pathId, status, redirectUrl = false, rejectMessage = undefined) {
  const setStatus = setLearningPathsStatus({ id: pathId, status });
  return updateLPStatus(pathId, status, redirectUrl, setStatus, rejectMessage);
}

export function updateLearningPathStatus(pathId, status, redirectUrl = false) {
  const setStatus = setLearningPathStatus({ status });
  return updateLPStatus(pathId, status, redirectUrl, setStatus);
}

export function copyLearningPath(learningPath, locale) {
  const copiedTitle = polyglot.t("copyLearningPath.copy").concat(learningPath.title.toString());
  const clonedLearningPathTitle = { title: copiedTitle, language: locale };

  return (dispatch) =>
    new Promise((resolve, reject) =>
      copyPath({ copyfrom: learningPath.id }, clonedLearningPathTitle)
        .then((lpath) => {
          dispatch(
            addMessage({
              message: polyglot.t("copyLearningPath.copiedMessage"),
            }),
          );
          dispatch(setLearningPath(lpath));
          dispatch(
            routerActions.push({
              pathname: lpath.learningsteps[0]
                ? `/learningpaths/${lpath.id}/step/${lpath.learningsteps[0].id}/`
                : `/learningpaths/${lpath.id}/`,
            }),
          );
          resolve();
        })
        .catch((err) => {
          dispatch(applicationError(err));
          if (err.status === 403) {
            dispatch(
              addMessage({
                message: polyglot.t("copyLearningPath.notAllowed"),
                severity: "danger",
                timeToLive: 10000,
              }),
            );
          }
          reject();
        }),
    );
}
