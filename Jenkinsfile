#!/usr/bin/env groovy

@Library('global-pipeline-shared-libs')
@Library('cmc-pipeline-shared-libs@master') _

pipeline {
	agent {
		node {
			label 'ec2'
		}
	}
	environment {
		DOCKER_IMAGE_NAME = "docker.deveng.systems/argos-cmc/common-react-components"
	}

	stages {
		stage('Setup') {
			steps {
			  // Set build status as pending
			  githubStatusUpdater(currentBuild.result)

				echo 'Fetching cmc-microservice-builder Docker image'
				sh 'docker pull docker.deveng.systems/argos-cmc/cmc-microservice-builder'

				echo 'Finding UI version'
				sh "docker run --rm -e BRANCH_NAME=$BRANCH_NAME -v \$(pwd)/:/git docker.deveng.systems/argos-cmc/cmc-microservice-builder ./getUIDockerTag.sh"
			}
		}
		stage('Build & Push Docker Image') {

			environment {
				IMAGE_TAG = readFile "./docker.version"
			}
			steps {
				echo "Building ${DOCKER_IMAGE_NAME}:${IMAGE_TAG}"
				sh "docker build . -t ${DOCKER_IMAGE_NAME}:${IMAGE_TAG}"
				echo "Pushing ${DOCKER_IMAGE_NAME}:${IMAGE_TAG}"
				sh "docker push ${DOCKER_IMAGE_NAME}:${IMAGE_TAG}"
			}
		}

		stage('Deploy') {
			environment {
				IMAGE_TAG = readFile "./docker.version"
			}
			parallel {
				stage('Deploy') {
					when { branch 'master' }
					steps {
						echo "Deploying '${IMAGE_TAG}'"
						sh "docker run --rm -e CMC_ENV='utils' -e MESOS_ENV='dev' -e MESOS_LOCATION='eu-west-1' -e BUILD_ID=${BUILD_TAG} -e IMAGE_TAG=${IMAGE_TAG} -v \$(pwd)/:/mesos docker.deveng.systems/argos-cmc/cmc-microservice-builder ./deploy.sh"
					}
				}
			}
		}
	}

	post {
		always {
			cmcSlackNotification()
			githubStatusUpdater(currentBuild.result)
			cleanWs()
		}
	}

}
