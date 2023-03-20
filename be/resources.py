import json
from distutils.util import strtobool

from flask import request, jsonify, Response
from flask_restful import Resource, reqparse

from auth_middleware import token_required
from models import db, Task


class TaskList(Resource):
    def get(self):
        try:
            page = int(request.args.get('page', 1))
            per_page = int(request.args.get('limit', 3))
            order_by_field = request.args.get('order_by', None)
            desc = strtobool(request.args.get('desc', 'false'))
        except (ValueError, KeyError):
            return 'bad request', 400
        if order_by_field and order_by_field in Task.__dict__.keys():
            if desc:
                tasks = Task.query.order_by(getattr(Task, order_by_field).desc())
            else:
                tasks = Task.query.order_by(order_by_field)
        else:
            tasks = Task.query
        tasks = tasks.paginate(page=page, per_page=per_page)
        total_tasks = Task.query.count()
        response_data = {
            "data": [task.to_dict() for task in tasks],
            "total_page": total_tasks//per_page + 1 if total_tasks%per_page else total_tasks//per_page,
            "current_page": page
        }
        return jsonify(response_data)

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True)
        parser.add_argument('email', type=str, required=True)
        parser.add_argument('text', type=str, required=True)
        data = parser.parse_args()
        try:
            task = Task(
                username=data['username'],
                email=data['email'],
                text=data['text'],
            )
            db.session.add(task)
            db.session.commit()
            response_data = task.to_dict()
            return Response(json.dumps(response_data), status=201, mimetype='application/json')
        except (KeyError, TypeError):
            return 'bad request', 400


class TaskDetail(Resource):
    method_decorators = {'put': [token_required], 'delete': [token_required]}

    def get(self, task_id):
        task = Task.query.get(task_id)
        if task:
            return jsonify(task.to_dict())
        return 'not found', 404

    def delete(self, task_id):
        task = Task.query.get(task_id)
        if task:
            db.session.delete(task)
            db.session.commit()
            return 'no content', 204
        return 'not found', 404

    def put(self, task_id):
        task = Task.query.get(task_id)
        if not task:
            return 'not found', 404
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True)
        parser.add_argument('email', type=str, required=True)
        parser.add_argument('text', type=str, required=True)
        parser.add_argument('done', type=bool, required=True)
        data = parser.parse_args()
        if task.text != data['text']:
            task.updated = True
        task.username = data['username']
        task.email = data['email']
        task.text = data['text']
        task.done = data['done']

        db.session.commit()
        return jsonify(task.to_dict())
