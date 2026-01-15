# Athena-Framework - Getting Started

**Pages:** 44

---

## module Athena::Routing::Requirement #

**URL:** https://athenaframework.org/Routing/Requirement/

**Contents:**
- module Athena::Routing::Requirement #
- Constants#
  - ASCII_SLUG = /[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*/#
  - CATCH_ALL = /.+/#
  - DATE_YMD = /[0-9]{4}-(?:0[1-9]|1[012])-(?:0[1-9]|[12][0-9]|(?<!02-)3[01])/#
  - DIGITS = /[0-9]+/#
  - POSITIVE_INT = /[1-9][0-9]*/#
  - UID_BASE32 = /[0-9A-HJKMNP-TV-Z]{26}/#
  - UID_BASE58 = /[1-9A-HJ-NP-Za-km-z]{22}/#
  - UID_RFC4122 = /[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}/#

Includes types related to route requirements.

The namespace also exposes various regex constants representing common universal requirements to make using them in routes easier.

Matches a date string in the format of YYYY-MM-DD.

**Examples:**

Example 1 (php):
```php
class ExampleController < ATH::Controller
  @[ARTA::Get(
    "/user/{id}",
    requirements: {"id" => ART::Requirement::DIGITS},
  )]
  def get_user(id : Int64) : Int64
    id
  end

  @[ARTA::Get(
    "/article/{slug}",
    requirements: {"slug" => ART::Requirement::ASCII_SLUG},
  )]
  def get_article(slug : String) : String
    slug
  end
end
```

---

## class Athena::Routing::Route inherits Reference #

**URL:** https://athenaframework.org/Routing/Route/

**Contents:**
- class Athena::Routing::Route inherits Reference #
  - Expressions#
  - Parameters#
    - Parameter Validation#
    - Optional Parameters#
    - Priority Parameter#
    - Special Parameters#
    - Extra Parameters#
    - Slash Characters in Route Parameters#
  - Sub-Domain Routing#

Provides an object-oriented way to represent an HTTP route, including the path, methods, schemes, host, and/or conditions required for it to match.

Ultimately, ART::Routes are compiled into ART::CompiledRoute that represents an immutable snapshot of a route, along with ART::CompiledRoute::Tokens representing each route parameter.

By default, a route is very liberal in regards to what allows when matching. E.g. Matching anything that matches the path, but with any HTTP method and any scheme. The methods and schemes properties can be used to restrict which methods/schemes the route allows.

In some cases you may want to match a route using arbitrary dynamic runtime logic. An example use case for this could be checking a request header, or anything else on the underlying ART::RequestContext and/or ART::Request instance. The condition property can be used for just this purpose:

This route would only match requests whose user-agent header includes Firefox. Be sure to also handle cases where headers may not be set.

Route conditions are NOT taken into consideration when generating routes via an ART::Generator::Interface.

Route parameters represent variable portions within a route's path. Parameters are uniquely named placeholders wrapped within curly braces. For example, /blog/{slug} includes a slug parameter. Routes can have more than one parameter, but each one may only map to a single value. Parameter placeholders may also be included with static portions for a string, such as /blog/posts-about-{category}. This can be useful for supporting format based URLs, such as /users.json or /users.csv via a /users.{_format} path.

By default, a placeholder is happy to accept any value. However in most cases you will want to restrict which values it allows, such as ensuring only numeric digits are allowed for a page parameter. Parameter validation also allows multiple routes to have variable portions within the same location. I.e. allowing /blog/{slug} and /blog/{page} to co-exist, which is a limitation for some other Crystal routers.

The requirements property accepts a Hash(String, String | Regex) where the keys are the name of the parameter and the value is a pattern in which the value must match for the route to match. The value can either be a string for exact matches, or a Regex for more complex patterns.

Route parameters may also be inlined within the path by putting the pattern within <>, instead of providing it as a dedicated argument. For example, /blog/{page<\\d+>} (note we need to escape the \ within a string literal).

Checkout ART::Requirement for a set of common, helpful requirement regexes.

By default, all parameters are required, meaning given the path /blog/{page}, /blog/10 would match but /blog would NOT match. Parameters can be made optional by providing a default value for the parameter, for example:

More than one parameter may have a default value, but everything after an optional parameter must also be optional. For example within /{page}/blog, page will always be required and /blog will NOT match.

defaults may also be inlined within the path by putting the value after a ?. This is also compatible with requirements, allowing both to be defined within a path. For example /blog/{page<\\d+>?1}.

The default value for a parameter may also be nil, with the inline syntax being adding a ? with no following value, e.g. {page?}. Be sure to update any type restrictions to be nilable as well.

When determining which route should match, the first matching route will win. For example, if two routes were added with variable parameters in the same location, the first one that was added would match regardless of what their requirements are. In most cases this will not be a problem, but in some cases you may need to ensure a particular route is checked first.

The routing component comes with a few standardized parameters that have special meanings. These parameters could be leveraged within the underlying implementation, but are not directly used within the routing component other than for matching.

This route supports en and fr locales in either html or xml formats with a default of en and html.

The trailing . is optional if the parameter to the right has a default. E.g. /articles/en/search would match with a format of html but /articles/en/search.xml would be required for matching non-default formats.

The defaults defined within a route do not all need to be present as route parameters. This could be useful to provide extra context to the controller that should handle the request.

By default, route parameters may include any value except a /, since that's the character used to separate the different portions of the URL. Route parameter matching logic may be made more permissive by using a more liberal regex, such as .+, for example:

Special parameters should NOT be made more permissive. For example, if the pattern is /share/{token}.{_format} and {token} allows any character, the /share/foo/bar.json URL will consider foo/bar.json as the token and the format will be empty. This can be solved by replacing the .+ requirement with [^.]+ to allow any character except dots.

Related to this, allowing multiple parameters to accept / may also lead to unexpected results.

The host property can be used to require the HTTP host header to match this value in order for the route to match.

In this example, both routes match the same path, but one requires a specific hostname. The host parameter can also be used as route parameters, including defaults and requirements support:

Inline defaults and requirements also works for host values, "{subdomain<m|mobile>?m}.example.com".

Adds the provided defaults, overriding previously set values.

Adds the provided requirements, overriding previously set values.

Returns a copy of self with all instance variables cloned.

Compiles and returns an ART::CompiledRoute representing this route. The route is only compiled once and future calls to this method will return the same compiled route, assuming no changes were made to this route in between.

Returns the optional ART::Route::Condition callback used to determine if this route should match. See Routing Expressions for more information.

Sets the optional ART::Route::Condition callback used to determine if this route should match.

See Routing Expressions for more information.

Returns the optional ART::Route::Condition callback used to determine if this route should match. See Routing Expressions for more information.

Returns the default with the provided key, if any.

Returns a hash representing the default values of a route's parameters if they were not provided in the request. See Optional Parameters for more information.

Sets the hash representing the default values of a route's parameters if they were not provided in the request to the provided defaults. See Optional Parameters for more information.

Returns true if this route has a default with the provided key, otherwise false.

Returns true if this route has a requirement with the provided key, otherwise false.

Returns true if this route allows the provided scheme, otherwise false.

Returns the hostname that the HTTP host header must match in order for this route to match. See Sub-Domain Routing for more information.

Sets the hostname that the HTTP host header must match in order for this route to match to the provided pattern. See Sub-Domain Routing for more information.

Returns the set of valid HTTP methods that this route supports. See ART::Route for more information.

Sets the set of valid HTTP method(s) that this route supports. See ART::Route for more information.

Returns the URL that this route will handle. See Routing Parameters for more information.

Sets the path required for this route to match to the provided pattern.

Returns the requirement with the provided key, if any.

Returns a hash representing the requirements the route's parameters must match in order for this route to match. See Parameter Validation for more information.

Sets the hash representing the requirements the route's parameters must match in order for this route to match to the provided requirements. See Parameter Validation for more information.

Returns the set of valid URI schemes that this route supports. See ART::Route for more information.

Sets the set of valid URI scheme(s) that this route supports. See ART::Route for more information.

Sets the default with the provided key to the provided value.

Sets the requirement with the provided key to the provided value.

**Examples:**

Example 1 (vue):
```vue
# This route will only handle `https` `POST` requests to `/path`.
route1 = ART::Route.new "/path", schemes: "https", methods: "POST"

# This route will handle `http` or `ftp` `GET`/`PATCH` requests to `/path`.
route2 = ART::Route.new "/path", schemes: {"https", "ftp"}, methods: {"GET", "PATCH"}
```

Example 2 (julia):
```julia
route = ART::Route.new "/contact"
route.condition do |context, request|
  request.headers["user-agent"].includes? "Firefox"
end
```

Example 3 (javascript):
```javascript
routes = ART::RouteCollection.new
routes.add "blog_list", ART::Route.new "/blog/{page}", requirements: {"page" => /\d+/}
routes.add "blog_show", ART::Route.new "/blog/{slug}"

matcher.match "/blog/foo" # => {"_route" => "blog_show", "slug" => "foo"}
matcher.match "/blog/10"  # => {"_route" => "blog_list", "page" => "10"}
```

Example 4 (yaml):
```yaml
ART::Route.new "/blog/{page}", {"page" => 1}, {"page" => /\d+/}

# ...

matcher.match "/blog" # => {"_route" => "blog_list", "page" => "1"}
```

---

## alias Athena::DependencyInjection::AnnotationConfigurations::AnnotationHash #

**URL:** https://athenaframework.org/DependencyInjection/AnnotationConfigurations/AnnotationHash/

**Contents:**
- alias Athena::DependencyInjection::AnnotationConfigurations::AnnotationHash #
- Alias definition

The Hash type that will store the annotation configurations.

---

## module Athena::Routing::Matcher #

**URL:** https://athenaframework.org/Routing/Matcher/

**Contents:**
- module Athena::Routing::Matcher #

Includes types related to matching a path/request to a route.

---

## Routing & HTTP

**URL:** https://athenaframework.org/getting_started/routing/

**Contents:**
- Routing & HTTP
- Controllers#
  - Creating a Route#
  - Raw Response#
  - Route Parameters#
    - Query Parameters#
  - Raw Request#
  - Streaming Response#
- File Uploads#
- File Response#

The Athena Framework is a MVC based framework, as such, the logic to handle a given route is defined within an ATH::Controller. Athena Framework takes an annotation based approach to routing. An annotation, such as ARTA::Get is applied to an instance method of a controller class, which will be executed when that endpoint receives a request.

In Athena Framework, controllers are simply classes and route actions are simply methods. This means they can be documented/tested as you would any Crystal class/method. However see the testing section for how to best test a controller.

Routing is handled via the Athena::Routing component. It provides a flexible and robust foundation for handling determining which route should match a given request.

Check out the debug:router command to view all of the routes the framework is aware of within your application.

An ATH::Response can be used to fully customize the response; such as returning a specific status code, or adding some one-off headers.

A View event is emitted if the returned value is NOT an ATH::Response. By default, non ATH::Responses are JSON serialized. However, this event can be listened on to customize how the value is serialized. More on this in the Content Negotiation section.

Arguments are converted to their expected types if possible, otherwise an error response is automatically returned. The values are provided directly as method arguments, thus preventing the need for env.params.url["name"] and any boilerplate related to it. Just like normal method arguments, default values can be defined. The method's return type adds some type safety to ensure the expected value is being returned.

For more complex conversions, consider creating a Value Resolver to encapsulate the logic.

ATHA::MapQueryParameter can be used to map a query parameter directly to a controller action parameter.

This works well enough for one-off parameters. However ATHA::MapQueryString can be used to the request's query string into a DTO type, much like how JSON::Serializable works for example. In addition to making it easier to reuse, it also allows for enhanced validation of the query parameters via the Athena::Validator component.

Restricting an action argument to ATH::Request will provide the raw request object. This can be useful to access data directly off the request object, such as consuming the request's body. This approach is fine for simple or one-off endpoints.

Check out ATHR::RequestBody for a better way to handle this.

By default ATH::Response content is written all at once to the response's IO. However in some cases the content may be too large to fit into memory. In this case an ATH::StreamedResponse may be used to stream the content back to the client.

Athena supports the opt-in feature of populating ATH::Request#files based on the files included in a multipart/form-data file upload request. A HTTP::FormData::Part without a filename is considered to be just a normal textual field and will be added to ATH::Request#attributes. These values can be provided to the controller action in the same way route parameters can.

Check out ATHA::MapUploadedFile for a better way to handle this.

An ATH::BinaryFileResponse may be used to return static files/content. This response type handles caching, partial requests, and setting the relevant headers. The Athena Framework also supports downloading of dynamically generated content by using an ATH::Response with the content-disposition header. ATH::HeaderUtils.make_disposition can be used to easily build the header.

Static files can also be served from an Athena application. This can be achieved by combining an ATH::BinaryFileResponse with the request event; checking if the request's path represents a file/directory within the application's public directory and returning the file if so.

A common use case, especially when rendering HTML, is generating links to other routes based on a set of provided parameters. When in the context of a request, the scheme and hostname of a ART::Generator::ReferenceType::ABSOLUTE_URL defaults to http and localhost respectively, if they could not be extracted from the request.

The parent ATH::Controller type provides some helper methods for generating URLs within the context of a controller.

Passing arguments to #generate_url that are not part of the route definition are included within the query string of the generated URL. self.generate_url "blog", page: 2, category: "Crystal" # The "blog" route only defines the "page" parameter; the generated URL is: # /blog/2?category=Crystal

A service can define a constructor parameter typed as ART::Generator::Interface in order to obtain the router service:

Generating URLs in commands works the same as in a service. However, commands are not executed in an HTTP context. Because of this, absolute URLs will always generate as http://localhost/ instead of your actual host name.

The solution to this is to configure the framework.router.default_uri configuration value. This'll ensure URLs generated within commands have the proper host.

Currently due to Athena Framework's architecture, WebSockets are not directly supported. However the framework does allow prepending HTTP::Handler to the internal server. This could be used to leverage the standard library's HTTP::WebSocketHandler handler or a third party library such as https://github.com/cable-cr/cable.

Alternatively, the Athena::Mercure component may be used as a replacement of the more common websocket use cases.

As mentioned earlier, controller action responses are JSON serialized if the controller action does NOT return an ATH::Response. The Negotiation component enhances the view layer of the Athena Framework by enabling content negotiation support; making it possible to write format agnostic controllers by placing a layer of abstraction between the controller and generation of the final response content. Or in other words, allow having the same controller action be rendered based on the request's Accept header and the format priority configuration.

The content negotiation logic is disabled by default, but can be easily enabled via the related bundle configuration. Content negotiation configuration is represented by an array of rules used to describe allowed formats, their priorities, and how things should function if a unsupported format is requested.

For example, say we configured things like:

Assuming an accept header with the value text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,application/json: a request made to /foo from the api.example.com hostname; the request format would be json. If the request was not made from that hostname; the request format would be html. The rules can be as complex or as simple as needed depending on the use case of your application.

The ATH::View::ViewHandler is responsible for generating an ATH::Response in the format determined by the ATH::Listeners::Format, otherwise falling back on the request's format, defaulting to json. The view handler has a options that may also be configured via the ATH::Bundle::Schema::ViewHandler schema.

An ATH::View is intended to act as an in between returning raw data and an ATH::Response. In other words, it still invokes the view event, but allows customizing the response's status and headers. Convenience methods are defined in the base controller type to make creating views easier. E.g. ATH::Controller#view.

By default the Athena Framework uses json as the default response format. However it is possible to extend the ATH::View::ViewHandler to support additional, and even custom, formats. This is achieved by creating an ATH::View::FormatHandlerInterface instance that defines the logic needed to turn an ATH::View into an ATH::Response.

The implementation can be as simple/complex as needed for the given format. Official handlers could be provided in the future for common formats such as html, probably via an integration with some form of tempting engine utilizing custom annotations to specify the format.

ATH::Request::FORMATS represents the formats supported by default. However this list is not exhaustive and may need altered application to application; such as registering new formats.

The following is a demonstration of how the various negotiation features can be used in conjunction. The example includes:

**Examples:**

Example 1 (php):
```php
require "athena"

# Define a controller
class ExampleController < ATH::Controller
  # Define an action to handle the related route
  @[ARTA::Get("/")]
  def index : String
    "Hello World"
  end

  # The macro DSL can also be used
  get "/" do
    "Hello World"
  end
end

# Run the server
ATH.run

# GET / # => Hello World
```

Example 2 (typescript):
```typescript
require "athena"
require "mime"

class ExampleController < ATH::Controller
  # A GET endpoint returning an `ATH::Response`.
  # Can be used to return raw data, such as HTML or CSS etc, in a one-off manner.
  @[ARTA::Get("/index")]
  def index : ATH::Response
    ATH::Response.new(
      "<h1>Welcome to my website!</h1>",
      headers: HTTP::Headers{"content-type" => MIME.from_extension(".html")}
    )
  end
end

ATH.run

# GET /index # => "<h1>Welcome to my website!</h1>"
```

Example 3 (json):
```json
require "athena"

class ExampleController < ATH::Controller
  @[ARTA::Get("/add/{value1}/{value2}")]
  def add(value1 : Int32, value2 : Int32) : Int32
    value1 + value2
  end
end

ATH.run

# GET /add/2/3    # => 5
# GET /add/foo/12 # => {"code":400,"message":"Required parameter 'value1' with value 'foo' could not be converted into a valid 'Int32'"}
```

Example 4 (json):
```json
require "athena"

class ExampleController < ATH::Controller
  @[ARTA::Get("/")]
  def index(@[ATHA::MapQueryParameter] page : Int32) : Int32
    page
  end
end

ATH.run

# GET /          # => {"code":404,"message":"Missing query parameter: 'page'."}
# GET /?page=10  # => 10
# GET /?page=bar # => {"code":404,"message":"Invalid query parameter: 'page'."}
```

---

## annotation Athena::Routing::Annotations::Put #

**URL:** https://athenaframework.org/Routing/Annotations/Put/

**Contents:**
- annotation Athena::Routing::Annotations::Put #

Same as ARTA::Route, but only matches the PUT method.

---

## Middleware

**URL:** https://athenaframework.org/getting_started/middleware/

**Contents:**
- Middleware
- Events#
  - 1. Request Event#
  - 2. Action Event#
  - 3. Invoke the Controller Action#
    - Argument Resolution#
    - Execute the Controller Action#
    - Handle the Response#
  - 4. View Event#
  - 5. Response Event#

At a high level the Athena Framework's job is to interpret a request and create the appropriate response based on your application logic. Conceptually this could be broken down into three steps:

Steps 1 and 3 are handled via Crystal's HTTP::Server, while step 2 is where the framework fits in.

Athena Framework is an event based framework, meaning it emits various events via the Event Dispatcher component during the life-cycle of a request. These events are listened on internally in order to handle each request; custom listeners on these events can also be registered. The flow of a request, and the related events that are dispatched, is depicted below in a visual format:

The very first event that is dispatched is the ATH::Events::Request event and can have a variety of listeners. The primary purpose of this event is to create an ATH::Response directly, or to add information to the requests' attributes; a simple key/value store tied to request instance accessible via ATH::Request#attributes.

In some cases the listener may have enough information to return an ATH::Response immediately. An example of this would be the ATH::Listeners::CORS listener. If enabled it is able to return a CORS preflight response even before routing is invoked.

If an ATH::Response is returned at this stage, the flow of the request skips directly to the response event. Future Request event listeners will not be invoked either.

Another use case for this event is populating additional data into the request's attributes; such as the locale or format of the request.

Request event in the Athena Framework

This is the event that ATH::Listeners::Routing listens on to determine which ATH::Controller/ATH::Action pair should handle the request.

See ATH::Controller for more details on routing.

The next event to be dispatched is the ATH::Events::Action event, assuming a response was not already returned within the request event. This event is dispatched after the related controller/action pair is determined, but before it is executed. This event is intended to be used when a listener requires information from the related ATH::Action; such as reading custom annotations.

This next step is not an event, but a important concept within the Athena Framework nonetheless; executing the controller action related to the current request.

Before the controller action can be invoked, the arguments, if any, to pass to it need to be determined. This is achieved via an ATH::Controller::ArgumentResolverInterface that facilitates gathering all the arguments. One or more ATHR::Interface will then be used to resolve each specific argument's value.

Checkout ATH::Controller::ValueResolvers for a summary of the built-in resolvers, and the order in which they are invoked. Custom value resolves may be created & registered to extend this functionality.

An additional event could possibly be added after the arguments have been resolved, but before invoking the controller action.

The job of a controller action is to apply business/application logic to build a response for the related request; such as an HTML page, a JSON string, or anything else. How/what exactly this should be is up to the developer creating the application.

The type of the value returned from the controller action determines what happens next. If the value is an ATH::Response, then it is used as is, skipping directly to the response event. However, if the value is NOT an ATH::Response, then the view is dispatched (since the framework needs an ATH::Response in order to have something to send back to the client).

The ATH::Events::View event is only dispatched when the controller action does NOT return an ATH::Response. The purpose of this event is to turn the controller action's return value into an ATH::Response.

An ATH::View may be used to customize the response, e.g. setting a custom response status and/or adding additional headers; while keeping the controller action response data intact.

This event is intended to be used as a "View" layer; allowing scalar values/objects to be returned while listeners convert that value to the expected format (e.g. JSON, HTML, etc.). See the negotiation component for more information on this feature.

View event in the Athena Framework

By default the framework will JSON serialize any non ATH::Response values.

The end goal of the Athena Framework is to return an ATH::Response back to the client; which might be created within the request event, returned from the related controller action, or set within the view event. Regardless of how the response was created, the ATH::Events::Response event is dispatched directly after.

The intended use case for this event is to allow for modifying the response object in some manner. Common examples include: add/edit headers, add cookies, change/compress the response body.

The raw HTTP::Server::Response object is never directly exposed. The reasoning for this is to allow listeners to mutate the response before it is returned as mentioned in the response event section. If the raw response object was exposed, whenever any data is written to it it'll immediately be sent to the client and the status/headers will be locked; as mentioned in the Crystal API docs:

The response #status and #headers must be configured before writing the response body. Once response output is written, changing the #status and #headers properties has no effect.

Each ATH::Response has a ATH::Response::Writer instance that determines how the response should be written to the raw response's IO. By default it is written directly, but can be customized via the response event, such as for compression.

The final event to be dispatched is the ATH::Events::Terminate event. This is event is dispatched after the response has been sent to the user.

The intended use case for this event is to perform some "heavy" action after the user has received the response; as to not affect the response time of the request. E.x. queuing up emails or logs to be sent/written after a successful request.

If an exception is raised at anytime while a request is being handled, the ATH::Events::Exception is dispatched. The purpose of this event is to convert the exception into an ATH::Response. This is globally handled via an ATH::ErrorRendererInterface, with the default being to JSON serialize the exception.

It is also possible to handle specific error states differently by registering multiple exception listeners to handle each case. An example of this could be to invoke some special logic only if the exception is of a specific type.

Unlike other frameworks, Athena Framework leverages event based middleware instead of a pipeline based approach. The primary use case for event listeners is to tap into the life-cycle of the request, such as adding common headers, setting state extracted from the request, or whatever else the application requires. These can be created by creating a type annotated with ADI::Register, then annotating one or more methods with AEDA::AsEventListener.

Similarly, the framework itself is implemented using the same features available to the users. Thus it is very easy to run specific listeners before/after the built-in ones if so desired.

Check out the debug:event-dispatcher command for an easy way to see all the listeners and the order in which they are executed.

A single event listener may listen on multiple events. Instance variables can be used to share state between the events.

The "type" of the listener has an effect on its behavior! When a struct service is retrieved or injected into a type, it will be a copy of the one in the SC (passed by value). This means that changes made to it in one type, will NOT be reflected in other types. A class service on the other hand will be a reference to the one in the SC. This allows it to share state between services.

Using events can be a helpful design pattern to allow for code that is easily extensible. An event represents something has happened where nobody may be interested in it, or in other words there may be zero or more listeners listening on a given event. A more concrete example is an event could be dispatched after some core piece of application logic. From here it would be easy to tap into when this logic is executed to perform some other follow up action, without increasing the complexity of the type that performs the core action. This also adheres to the single responsibility principle.

**Examples:**

Example 1 (php):
```php
require "athena"

@[ADI::Register]
class CustomListener
  @[AEDA::AsEventListener]
  def on_response(event : ATH::Events::Response) : Nil
    event.response.headers["FOO"] = "BAR"
  end
end

class ExampleController < ATH::Controller
  get "/" do
    "Hello World"
  end
end

ATH.run

# GET / # => Hello World (with `FOO => BAR` header)
```

Example 2 (python):
```python
require "athena"

# Define a custom event
class MyEvent < AED::Event
  property value : Int32

  def initialize(@value : Int32); end
end

# Define a listener that listens our the custom event.
@[ADI::Register]
class CustomEventListener
  @[AEDA::AsEventListener]
  def call(event : MyEvent) : Nil
    event.value *= 10
  end
end

# Register a controller as a service,
# injecting the event dispatcher to handle processing our value.
@[ADI::Register]
class ExampleController < ATH::Controller
  def initialize(@event_dispatcher : AED::EventDispatcherInterface); end

  @[ARTA::Get("/{value}")]
  def get_value(value : Int32) : Int32
    event = MyEvent.new value

    @event_dispatcher.dispatch event

    event.value
  end
end

ATH.run

# GET /10 # => 100
```

---

## class Athena::Routing::Matcher::URLMatcher inherits Reference #

**URL:** https://athenaframework.org/Routing/Matcher/URLMatcher/

**Contents:**
- class Athena::Routing::Matcher::URLMatcher inherits Reference #
- Included modules
- Direct known subclasses
- Constructors#
  - .new(context : ART::RequestContext, route_provider : ART::RouteProvider.class = ART::RouteProvider)#
- Methods#
  - #context : ART::RequestContext#
  - #context=(context : ART::RequestContext)#
  - #match(path : String) : Hash(String, String | Nil)#
  - #match(request : ART::Request) : Hash(String, String | Nil)#

Default implementation of ART::Matcher::RequestMatcherInterface and ART::Matcher::URLMatcherInterface.

Returns the request context.

Sets the request context.

Tries to match the provided path to its related route. Returns a hash of the route's defaults and parameters resolved from the path.

Raises an ART::Exception::ResourceNotFound if no route could be matched.

Raises an ART::Exception::MethodNotAllowed if a route exists but not for the current HTTP method.

Tries to match the provided request to its related route. Returns a hash of the route's defaults and parameters resolved from the request.

Raises an ART::Exception::ResourceNotFound if no route could be matched.

Raises an ART::Exception::MethodNotAllowed if a route exists but not for the request's method.

Tries to match the provided path to its related route. Returns a hash of the route's defaults and parameters resolved from the path.

Returns nil if no route could be matched or a route exists but not for the current HTTP method.

Tries to match the provided request to its related route. Returns a hash of the route's defaults and parameters resolved from the request.

Returns nil if no route could be matched or a route exists but not for the request's method.

---

## module Athena::Routing::Matcher::RequestMatcherInterface #

**URL:** https://athenaframework.org/Routing/Matcher/RequestMatcherInterface/

**Contents:**
- module Athena::Routing::Matcher::RequestMatcherInterface #
- Direct including types
- Methods#
  - abstract #match(request : ART::Request) : Hash(String, String | Nil)#
  - abstract #match?(request : ART::Request) : Hash(String, String | Nil) | Nil#

Similar to ART::Matcher::URLMatcherInterface, but tries to match against an ART::Request.

Tries to match the provided request to its related route. Returns a hash of the route's defaults and parameters resolved from the request.

Raises an ART::Exception::ResourceNotFound if no route could be matched.

Raises an ART::Exception::MethodNotAllowed if a route exists but not for the request's method.

Tries to match the provided request to its related route. Returns a hash of the route's defaults and parameters resolved from the request.

Returns nil if no route could be matched or a route exists but not for the request's method.

---

## class Athena::Routing::RequestContext inherits Reference #

**URL:** https://athenaframework.org/Routing/RequestContext/

**Contents:**
- class Athena::Routing::RequestContext inherits Reference #
- Constructors#
  - .from_uri(uri : String, host : String = "localhost", scheme : String = "http", http_port : Int32 = 80, https_port : Int32 = 443) : self#
  - .from_uri(uri : URI, host : String = "localhost", scheme : String = "http", http_port : Int32 = 80, https_port : Int32 = 443) : self#
  - .new(base_url : String = "", method : String = "GET", host : String = "localhost", scheme : String = "http", http_port : Int32 = 80, https_port : Int32 = 443, path : String = "/", query_string : String = "")#
- Methods#
  - #apply(request : ART::Request) : self#
  - #base_url : String#
  - #base_url=(base_url : String) : self#
  - #has_parameter?(name : String) : Bool#

Represents data from a request in an agnostic manner, primarily used to augment URL matching and generation with additional context.

Creates a new instance of self from the provided uri. The host, scheme, http_port, and https_port optionally act as fallbacks if they are not contained within the uri.

ameba:disable Metrics/CyclomaticComplexity:

Creates a new instance of self from the provided uri. The host, scheme, http_port, and https_port optionally act as fallbacks if they are not contained within the uri.

ameba:disable Metrics/CyclomaticComplexity:

Updates the properties within self based on the provided request.

Represents the path of the URL before #path. E.g. a path that should be prefixed to all other #paths.

Returns the global parameters that should be used as part of the URL generation logic.

Returns the query string of the current request.

---

## enum Athena::Routing::Generator::ReferenceType #

**URL:** https://athenaframework.org/Routing/Generator/ReferenceType/

**Contents:**
- enum Athena::Routing::Generator::ReferenceType #
- Members#
  - ABSOLUTE_URL = 0#
  - ABSOLUTE_PATH = 1#
  - RELATIVE_PATH = 2#
  - NETWORK_PATH = 3#
- Methods#
  - #absolute_path?#
  - #absolute_url?#
  - #network_path?#

Represents the type of URLs that are able to be generated via an ART::Generator::Interface.

Includes an absolute URL including protocol, hostname, and path: https://api.example.com/add/10/5.

The default type, includes an absolute path from the root to the generated route: /add/10/5.

Returns a path relative to the path of the request. For example:

Similar to ABSOLUTE_URL, but reuses the current protocol: //api.example.com/add/10/5.

Returns true if this enum value equals ABSOLUTE_PATH

Returns true if this enum value equals ABSOLUTE_URL

Returns true if this enum value equals NETWORK_PATH

Returns true if this enum value equals RELATIVE_PATH

**Examples:**

Example 1 (javascript):
```javascript
routes = ART::RouteCollection.new
routes.add "one", ART::Route.new "/a/b/c/d"
routes.add "two", ART::Route.new "/a/b/c/"
routes.add "three", ART::Route.new "/a/b/"
routes.add "four", ART::Route.new "/a/b/c/other"
routes.add "five", ART::Route.new "/a/x/y"

ART.compile routes

context = ART::RequestContext.new path: "/a/b/c/d"

generator = ART::Generator::URLGenerator.new context

generator.generate "one", reference_type: :relative_path   # => ""
generator.generate "two", reference_type: :relative_path   # => "./"
generator.generate "three", reference_type: :relative_path # => "../"
generator.generate "four", reference_type: :relative_path  # => "other"
generator.generate "five", reference_type: :relative_path  # => "../../x/y"
```

---

## module Athena::Console::Commands #

**URL:** https://athenaframework.org/Console/Commands/

**Contents:**
- module Athena::Console::Commands #

Includes the commands that come bundled with Athena::Console.

---

## struct Athena::DependencyInjection::AnnotationConfigurations inherits Struct #

**URL:** https://athenaframework.org/DependencyInjection/AnnotationConfigurations/

**Contents:**
- struct Athena::DependencyInjection::AnnotationConfigurations inherits Struct #
- Constructors#
  - .new(annotation_hash : AnnotationHash = AnnotationHash.new)#
- Methods#
  - #has?(ann_class : ADI::AnnotationConfigurations::Classes) : Bool#

Wraps a hash of configuration annotations applied to a given type, method, or instance variable. Provides the logic to access each annotation's configuration in a type safe manner.

Implementations using this type must define the logic to provide the annotation hash manually; this would most likely just be something like:

Centralize the hash resolution logic once this issue is resolved.

Returns true if there are annotations of the provided ann_class, otherwise false.

**Examples:**

Example 1 (json):
```json
# Define a hash to store the configurations.
{% custom_configurations = {} of Nil => Nil %}

# Iterate over the stored annotation classes.
{% for ann_class in ADI::CUSTOM_ANNOTATIONS %}
   {% ann_class = ann_class.resolve %}

   # Define an array to store the annotation configurations of this type.
   {% annotations = [] of Nil %}

   # Iterate over each annotation of this type on the given type, method, or instance variable.
   {% for ann in type_method_instance_variable.annotations ann_class %}
     # Add a new instance of the annotations configuration to the array.
     # Add the annotation's positional arguments first, if any, then named arguments.
     {% annotations << "#{ann_class}Configuration.new(#{ann.args.empty? ? "".id : "#{ann.args.splat},".id}#{ann.named_args.double_splat})".id %}
   {% end %}

   # Update the configuration hash with the annotation class and configuration objects, but only if there was at least one.
   {% custom_configurations[ann_class] = "(#{annotations} of ADI::AnnotationConfigurations::ConfigurationBase)".id unless annotations.empty? %}
 {% end %}

# ...

# Use the built hash to instantiate a new `ADI::AnnotationConfigurations` instance.
ADI::AnnotationConfigurations.new({{custom_configurations}} of ADI::AnnotationConfigurations::Classes => Array(ADI::AnnotationConfigurations::ConfigurationBase)),
```

---

## module Athena::Routing::Annotations #

**URL:** https://athenaframework.org/Routing/Annotations/

**Contents:**
- module Athena::Routing::Annotations #

Contains all the Athena::Routing based annotations. See ARTA::Route for more information.

These are primarily to define a common type/documentation to use in custom implementations. As of now, they are not leveraged internally, but a future iteration could provide a built in way to resolve them into an ART::RouteCollection.

---

## module Athena::Framework::Commands #

**URL:** https://athenaframework.org/Framework/Commands/

**Contents:**
- module Athena::Framework::Commands #

Namespace for the built in Athena::Console commands that come bundled with the framework. Currently it provides:

See each command class for more information.

---

## Commands

**URL:** https://athenaframework.org/getting_started/commands/

**Contents:**
- Commands
- Basic Usage#
- Built-in Commands#

The Athena Framework comes with a built-in integration with the Athena::Console component. This integration can be a way to define alternate entry points into your business logic, such as for use with scheduled jobs (Cron, Airflow, etc), or one-off internal/administrative things (running migrations, creating users, etc) all the while sharing the same dependencies due to it also leveraging dependency injection.

Similar to event listeners, console commands can simply be registered as a service to be automatically registered. If using the preferred ACONA::AsCommand annotation, they are registered in a lazy fashion, meaning only the command(s) you execute will actually be instantiated.

From here, if the application was created using the skeleton, commands can be executed via shards run console -- admin:create-user 12 "George Dietrich" --admin. Otherwise ATH.run_console can be used for your entrypoint file.

During development the console binary needs to re-build the application in order to have access to the changes made since last execution. When deploying a production console binary, or if not doing any new console command dev, build it with the --release flag for increased performance.

The framework also comes with some helpful built-in commands to either help with debugging, or provide framework specific features. See each command within the ATH::Commands namespace for more information.

**Examples:**

Example 1 (swift):
```swift
@[ADI::Register]
@[ACONA::AsCommand("admin:create-user", description: "Creates a new internal user")]
class AdminCreateUser < ACON::Command
  # A constructor can be defined to leverage existing services if applicable
  #def initialize(
  #  @some_service : MyService
  #)
  #  # Just be sure to call `super()`!
  #  super()
  #end

  # Configure the command by adding arguments, options, aliases, etc.
  protected def configure : Nil
    self
      .argument("id", :required, "The employee's ID")
      .argument("name", :required, "The user's name")
      .argument("email", :optional, "The user's email. Assumed to be first.last if not provided")
      .option("admin", nil, :none, "If the user should be created as an internal admin")
  end

  protected def execute(input : ACON::Input::Interface, output : ACON::Output::Interface) : ACON::Command::Status
    # Provides a standardized format for how to display text in the terminal
    style = ACON::Style::Athena.new input, output

    input.argument "id", Int32   # => 12
    name = input.argument "name" # => "George Dietrich"
    input.argument "email"       # => nil
    input.option "admin", Bool   # => true

    # Implement your business logic

    style.success "Successfully created a user for #{name}!"

    # Note the command executed successfully
    Status::SUCCESS
  end
end
```

---

## Testing

**URL:** https://athenaframework.org/getting_started/testing/

**Contents:**
- Testing
- TestCase#
- Testing Services#
- Testing Controllers#
- Testing Commands#

One of the benefits of using the Athena Framework is testing is considered a first class citizen. Both the framework and the components themselves provides testing utilities to help ensure your code is working as expected.

A small amount of setup is required to make use of the testing features provided by the framework. If you created your project via the skeleton template repository, then everything is ready for use out of the box. Otherwise, ensure that your spec/spec_helper.cr file includes the following requires/method calls, in this order:

It's important that your main entrypoint file is required before athena/spec.

At the core is the Athena::Spec component, with ASPEC::TestCase being the primary type. ASPEC::TestCase provides an alternative DSL for creating tests compliant with the stdlib's Spec module.

ASPEC::TestCase is NOT a standalone testing framework, but is fully intended to be mixed with standard describe, it, and/or pending blocks depending on which approach makes the most sense for what is being tested.

The primary benefit of this approach is that logic is more easily shared/reused as compared to the normal block based approach. I.e. a component can provide a base test case type that can be inherited from, a few methods implemented, and tada. For example, AVD::Spec::ConstraintValidatorTestCase.

The ASPEC::TestCase::DataProvider and ASPEC::TestCase::TestWith annotations can make testing similar code with different inputs super easy!

Testing a type/service is best done in isolation, using mocked versions of its dependencies to ensure that specific type is working as expected. In most cases this can be as simple as defining a private class that includes/implements an interface along with additional inputs for asserting it was called as expected. In other cases, the related component may provide these out of the box, such as:

Checkout the Spec namespace of each component in the API Reference for more examples.

While testing a service in isolation is a good starting point; it does not make the most sense for all types of services. A perfect example of this are ATH::Controllers. Controllers are best tested in conjunction with the various moving parts that make them function.

To make this as easy as possible, the framework provides ATH::Spec::APITestCase and provides many helpful HTTP related expectations.

Similar to controllers, commands also have additional moving parts that need to accounted for when testing. The ACON::Spec::CommandTester type can be used to simplify this:

**Examples:**

Example 1 (markdown):
```markdown
require "spec"
require "../src/main" # Or whatever the name of your entrypoint file is called
require "athena/spec"

# ...

ASPEC.run_all
```

Example 2 (julia):
```julia
struct ExampleSpec < ASPEC::TestCase
  def test_add : Nil
    (1 + 2).should eq 3
  end
end
```

Example 3 (julia):
```julia
require "athena"
require "athena/spec"

class ExampleController < ATH::Controller
  @[ARTA::Get("/add/{value1}/{value2}")]
  def add(value1 : Int32, value2 : Int32, @[ATHA::MapQueryParameter] negative : Bool = false) : Int32
    sum = value1 + value2
    negative ? -sum : sum
  end
end

struct ExampleControllerTest < ATH::Spec::APITestCase
  def test_add_positive : Nil
    self.get("/add/5/3").body.should eq "8"
  end

  def test_add_negative : Nil
    self.get("/add/5/3?negative=true").body.should eq "-8"
  end
end

# Run all test case tests.
ASPEC.run_all
```

Example 4 (julia):
```julia
describe AddCommand do
  describe "#execute" do
    it "without negative option" do
      tester = ACON::Spec::CommandTester.new AddCommand.new
      tester.execute value1: 10, value2: 7
      tester.display.should eq "The sum of the values is: 17\n"
    end

    it "with negative option" do
      tester = ACON::Spec::CommandTester.new AddCommand.new
      tester.execute value1: -10, value2: 5, "--negative": nil
      tester.display.should eq "The sum of the values is: 5\n"
    end
  end
end
```

---

## alias Athena::Routing::Request #

**URL:** https://athenaframework.org/Routing/Request/

**Contents:**
- alias Athena::Routing::Request #
- Alias definition

Represents the type of the request parameter within an ART::Route::Condition.

Will be an ATH::Request instance if used within the Athena Framework, otherwise HTTP::Request.

---

## Configuration

**URL:** https://athenaframework.org/getting_started/configuration/

**Contents:**
- Configuration
- Bundles#
  - Schemas#
    - Validation#
    - Multi-Environment#
- Parameters#
- Custom Annotations#
  - Pagination#

Some features need to be configured; either to enable/control how they work, or to customize the default functionality.

The ATH.configure macro is the primary entrypoint for configuring Athena Framework applications. It is used in conjunction with the related bundle schema that defines the possible configuration properties:

In this example we enable the CORS Listener, as well as configure it to function as we desire. However you may be wondering "how do I know what configuration properties are available?" or "what is that 'bundle schema' thing mentioned earlier?". For that we need to introduce the concept of a Bundle.

It should be well known by now that the components that make up Athena's ecosystem are independent and usable outside of the Athena Framework itself. However because they are made with the assumption that the entire framework will not be available, there has to be something that provides the tighter integration into the rest of the framework that makes it all work together so nicely.

Bundles in the Athena Framework provide the mechanism by which external code can be integrated into the rest of the framework. This primarily involves wiring everything up via the Athena::DependencyInjection component. But it also ties back into the configuration theme by allowing the user to control how things are wired up and/or function at runtime.

What makes the bundle concept so powerful and flexible is that it operates at the compile time level. E.g. if feature(s) are disabled in the configuration, then the types related to those feature(s) will not be included in the resulting binary at all. Similarly, the configuration values can be accessed/used as constructor arguments to the various services, something a runtime approach would not allow.

Expand upon bundle internals and how to create custom bundles.

Each bundle is responsible for defining a "schema" that represents the possible configuration properties that relate to the services provided by that bundle. Each bundle also has a name that is used to namespace the configuration passed to ATH.configure. From there, the keys maps to the downcase snakecased of the types found within the bundle's schema. For example, the Framework Bundle used in the previous example, exposes cors and format_listener among others as part of its schema.

Bundles and schemas are not something the average end user is going to need to define/manage themselves other than register/configure to fit their needs.

The compile time nature of bundles also extends to how their schemas are validated. Bundles will raise a compile time error if the provided configuration values are invalid according to its schema. For example:

This also works for nested values:

Or if the schema defines a value that is not nilable nor has a default:

It can also call out unexpected keys:

Hash configuration values are unchecked so are best used for unstructured data. If you have a fixed set of related configuration, consider using object_of.

In most cases, the configuration for each bundle is likely going to vary one environment to another. Values that change machine to machine should ideally be leveraging environmental variables. However, there are also cases where the underlying configuration should be different. E.g. locally use an in-memory cache while using redis in other environments.

To handle this, ATH.configure may be called multiple times, with the last call taking priority. The configuration is deep merged together as well, so only the configuration you wish to alter needs to be defined. However hash/array/namedTuple values are not. Normal compile time logic may be used to make these conditional as well. E.g. basing things off --release or --debug flags vs the environment.

Consider abstracting the additional ATH.configure calls to their own files, and require them. This way things stay pretty organized, without needing large conditional logic blocks.

Sometimes the same configuration value is used in several places within ATH.configure. Instead of repeating it, you can define it as a "parameter", which represents reusable configuration values. Parameters are intended for values that do not change between machines, and control the application's behavior, e.g. the sender of notification emails, what features are enabled, or other high level application level values.

Parameters should NOT be used for values that rarely change, such as the max amount of items to return per page. These types of values are better suited to being a constant within the related type. Similarly, infrastructure related values that change from one machine to another, e.g. development machine to production server, should be defined using environmental variables.

Parameters can be defined using the special top level parameters key within ATH.configure.

The parameter value may be any primitive type, including strings, bools, hashes, arrays, etc. From here they can be used when configuring a bundle via enclosing the name of the parameter within %. For example:

Parameters may also be injected directly into services via their constructor.

Athena integrates the Athena::DependencyInjection component's ability to define custom annotation configurations. This feature allows developers to define custom annotations, and the data that should be read off of them, then apply/access the annotations on ATH::Controller and/or ATH::Actions.

This is a powerful feature that allows for almost limitless flexibility/customization. Some ideas include: storing some value in the request attributes and raise an exception or invoke some external service; all based on the presence/absence of it, a value read off of it, or either/both of those in-conjunction with an external service. For example:

A good example use case for custom annotations is the creation of a Paginated annotation that can be applied to controller actions to have them be paginated via the listener. Generic pagination can be implemented via listening on the view event which exposes the value returned via the related controller action.

**Examples:**

Example 1 (css):
```css
ATH.configure({
  framework: {
    cors: {
      enabled:  true,
      defaults: {
        allow_credentials: true,
        allow_origin: ["https://app.example.com"],
        expose_headers: ["X-Transaction-ID X-Some-Custom-Header"],
      },
    },
  },
})
```

Example 2 (yaml):
```yaml
10 | allow_credentials: 10,
                          ^
Error: Expected configuration value 'framework.cors.defaults.allow_credentials' to be a 'Bool', but got 'Int32'.
```

Example 3 (yaml):
```yaml
10 | allow_origin:      [10, "https://app.example.com"] of String,
                           ^
Error: Expected configuration value 'framework.cors.defaults.allow_origin[0]' to be a 'String', but got 'Int32'.
```

Example 4 (yaml):
```yaml
10 | property some_property : String
               ^------------
Error: Required configuration property 'framework.some_property : String' must be provided.
```

---

## class Athena::Framework::Commands::DebugRouterMatch inherits Athena::Console::Command #

**URL:** https://athenaframework.org/Framework/Commands/DebugRouterMatch/

**Contents:**
- class Athena::Framework::Commands::DebugRouterMatch inherits Athena::Console::Command #
- Constructors#
  - .new(router : ART::RouterInterface)#

Similar to ATH::Commands::DebugRouter, but instead of providing the route name, you provide the request path in order to determine which, if any, route that path maps to.

Or if the route only partially matches:

**Examples:**

Example 1 (json):
```json
$ ./bin/console debug:router:match /user/10
 [OK] Route 'example_controller_user' matches

+--------------+-------------------------------------+
| Property     | Value                               |
+--------------+-------------------------------------+
| Route Name   | example_controller_user             |
| Path         | /user/{id}                          |
| Path Regex   | ^/user/(?P<id>\d+)$                 |
| Host         | ANY                                 |
| Host Regex   |                                     |
| Scheme       | ANY                                 |
| Methods      | GET                                 |
| Requirements | id: \d+                             |
| Class        | Athena::Routing::Route              |
| Defaults     | _controller: ExampleController#user |
+--------------+-------------------------------------+
```

Example 2 (json):
```json
$ ./bin/console debug:router:match /user/foo
 Route 'example_controller_user' almost matches but requirement for 'id' does not match (\d+)

 [ERROR] None of the routes match the path '/user/foo'
```

---

## class Athena::Routing::RoutingHandler inherits Reference #

**URL:** https://athenaframework.org/Routing/RoutingHandler/

**Contents:**
- class Athena::Routing::RoutingHandler inherits Reference #
  - Bubbling Exceptions#
- Included modules
- Constructors#
  - .new(matcher : ART::Matcher::URLMatcherInterface | Nil = nil, collection : ART::RouteCollection = ART::RouteCollection.new, bubble_exceptions : Bool = false)#
- Methods#
  - #add(name : String, route : ART::Route, priority : Int32 = 0, &block : HTTP::Server::Context, Hash(String, String | Nil) -> Nil) : Nil#
  - #call(context)#
  - #compile : self#

Provides basic routing functionality to an HTTP::Server.

This type works as both a HTTP::Handler and an ART::RouteCollection that accepts a block that will handle that particular route.

This handler should be the last one, as it is terminal.

By default, requests that result in an exception, either from Athena::Routing or the callback block itself, are gracefully handled by returning a proper error response to the client via HTTP::Server::Response#respond_with_status.

You can set bubble_exceptions: true when instantiating the routing handler to have full control over the returned response. This would allow you to define your own HTTP::Handler that can rescue the exceptions and apply your custom logic for how to handle the error.

Adds the provided route with the provided name to this collection, optionally with the provided priority. The passed block will be called when a request matching this route is encountered.

Helper method that calls ART.compile with the internal ART::RouteCollection, and returns self to make setting up the routes easier.

**Examples:**

Example 1 (julia):
```julia
handler = ART::RoutingHandler.new

# The `methods` property can be used to limit the route to a particular HTTP method.
handler.add "new_article", ART::Route.new("/article", methods: "post") do |ctx|
  pp ctx.request.body.try &.gets_to_end
end

# The match parameters from the route are passed to the callback as a `Hash(String, String?)`.
handler.add "article", ART::Route.new("/article/{id<\\d+>}", methods: "get") do |ctx, params|
  pp params # => {"_route" => "article", "id" => "10"}
end

# Call the `#compile` method when providing the handler to the handler array.
server = HTTP::Server.new([
  handler.compile,
])

address = server.bind_tcp 8080
puts "Listening on http://#{address}"
server.listen
```

Example 2 (php):
```php
class ErrorHandler
  include HTTP::Handler

  def call(context)
    call_next context
  rescue ex
    # Do something based on the ex, such as rendering the appropriate template, etc.
  end
end

handler = ART::RoutingHandler.new bubble_exceptions: true

# Add the routes...

# Have the `ErrorHandler` run _before_ the routing handler.
server = HTTP::Server.new([
  ErrorHandler.new,
  handler.compile,
])

address = server.bind_tcp 8080
puts "Listening on http://#{address}"
server.listen
```

Example 3 (markdown):
```markdown
handler = ART::RoutingHandler.new

# Register routes

server = HTTP::Server.new([
  handler.compile,
])
```

---

## alias Athena::DependencyInjection::AnnotationConfigurations::Classes #

**URL:** https://athenaframework.org/DependencyInjection/AnnotationConfigurations/Classes/

**Contents:**
- alias Athena::DependencyInjection::AnnotationConfigurations::Classes #
- Alias definition

A union representing the possible annotation classes that could be applied to a type, method, or instance variable.

---

## module Athena::Routing::Matcher::URLMatcherInterface #

**URL:** https://athenaframework.org/Routing/Matcher/URLMatcherInterface/

**Contents:**
- module Athena::Routing::Matcher::URLMatcherInterface #
- Included modules
- Direct including types
- Methods#
  - abstract #match(path : String) : Hash(String, String | Nil)#
  - abstract #match?(path : String) : Hash(String, String | Nil) | Nil#

Allows matching a request path, or ART::Request in the case of ART::Matcher::RequestMatcherInterface, to its related route.

Tries to match the provided path to its related route. Returns a hash of the route's defaults and parameters resolved from the path.

Raises an ART::Exception::ResourceNotFound if no route could be matched.

Raises an ART::Exception::MethodNotAllowed if a route exists but not for the current HTTP method.

Tries to match the provided path to its related route. Returns a hash of the route's defaults and parameters resolved from the path.

Returns nil if no route could be matched or a route exists but not for the current HTTP method.

**Examples:**

Example 1 (sql):
```sql
# Create a new route collection and add a route with a single parameter to it.
routes = ART::RouteCollection.new
routes.add "blog_show", ART::Route.new "/blog/{slug}"

# Compile the routes.
ART.compile routes

# Represents the request in an agnostic data format.
# In practice this would be created from the current `ART::Request`.
context = ART::RequestContext.new

# Match a request by path.
matcher = ART::Matcher::URLMatcher.new context
matcher.match "/blog/foo-bar" # => {"_route" => "blog_show", "slug" => "foo-bar"}
```

---

## class Athena::Console::Commands::DumpCompletion inherits Athena::Console::Command #

**URL:** https://athenaframework.org/Console/Commands/DumpCompletion/

**Contents:**
- class Athena::Console::Commands::DumpCompletion inherits Athena::Console::Command #

Can be used to generate the completion script to enable argument/option value completion.

See the related docs for more information.

---

## annotation Athena::Routing::Annotations::Route #

**URL:** https://athenaframework.org/Routing/Annotations/Route/

**Contents:**
- annotation Athena::Routing::Annotations::Route #
  - Configuration#
      - path#
      - name#
      - requirements#
      - defaults#
      - host#
      - methods#
      - schemes#
      - condition#

Annotation representation of an ART::Route. Most commonly this will be applied to a method to define it as the controller for the related route, but could also be applied to a controller class to apply defaults to all other ARTA::Route within it. Custom implementations may support alternate APIs. See ART::Route for more information.

Various fields can be used within this annotation to control how the route is created. All fields are optional unless otherwise noted.

Not all fields may be supported by the underlying implementation.

Type: String | Hash(String, String) - required

The path of the route.

The unique name of the route. If not provided, a unique name should be created automatically.

Type: Hash(String, String | Regex)

A Hash of patterns that each parameter must match in order for the route to match.

Type: Hash(String, _)

The values that should be applied to the route parameters if they were not supplied within the request.

Require the host header to match this value in order for the route to match.

Type: String | Enumerable(String)

A whitelist of the HTTP methods this route supports.

Type: String | Enumerable(String)

A whitelist of the HTTP schemes this route supports.

Type: ART::Route::Condition

A callback used to dynamically determine if the request matches the route.

A value used to control the order the routes are registered in. A higher value means that route will be registered earlier.

Allows setting the locale this route supports. Sets the special _locale route parameter.

Allows setting the format this route supports. Sets the special _format route parameter.

If the route should be cached or not.

---

## Error Handling

**URL:** https://athenaframework.org/getting_started/error_handling/

**Contents:**
- Error Handling
- HTTP Exceptions#
- Logging#
    - Customization#

Exception handling in the Athena Framework is similar to exception handling in any Crystal program, with the addition of a new unique exception type, ATH::Exception::HTTPException. Custom HTTP errors can also be defined by inheriting from ATH::Exception::HTTPException or a child type. A use case for this could be allowing additional data/context to be included within the exception.

Non ATH::Exception::HTTPException exceptions are represented as a 500 Internal Server Error.

When an exception is raised, the framework emits the Exception event to allow an opportunity for it to be handled. By default these exceptions will return a JSON serialized version of the exception, via ATH::ErrorRenderer, that includes the message and code; with the proper response status set. If the exception goes unhandled, i.e. no listener sets an ATH::Response on the event, then the request is finished and the exception is re-raised.

Logging is handled via Crystal's Log module. Athena Framework logs when a request matches a controller action, as well as any exception. This of course can be augmented with additional application specific messages.

By default the Athena Framework utilizes the default Log::Formatter and Log::Backends Crystal defines. This of course can be customized via interacting with Crystal's Log module. It is also possible to control what exceptions, and with what severity, will be logged by redefining the log_exception method within ATH::Listeners::Error.

Since ATH::Listeners::Error logs already include the error message and first line of the trace, consider defining a custom Log Formatter that excludes the exception to have shorter, single line error logs in console: Log.define_formatter SingleLineFormatter, "#{timestamp} #{severity} - #{source(after: ": ")}#{message}" \ "#{data(before: " -- ")}#{context(before: " -- ")}" # 2024-03-04T05:30:29.329041Z INFO - athena.framework: Server has started and is listening at http://0.0.0.0:3000 # 2024-03-04T05:30:37.568264Z INFO - athena.framework: Matched route 'view_controller_bar' -- route: "view_controller_bar", route_parameters: {"_route" => "view_controller_bar", # "_controller" => "ViewController#bar"}, request_uri: "/bar", method: "GET" # 2024-03-04T05:30:40.280070Z INFO - athena.framework: Matched route 'view_controller_foo' -- route: "view_controller_foo", route_parameters: {"_route" => "view_controller_foo", # "_controller" => "ViewController#foo"}, request_uri: "/foo", method: "GET" # 2024-03-04T05:30:40.351541Z ERROR - athena.framework: Uncaught exception #<Athena::Framework::Exception::Logic:Failed to serialize response body. Did you forget to include # either `JSON::Serializable` or `ASR::Serializable`?> at src/components/framework/src/view/view_handler.cr:166:21 in 'init_response' # 2024-03-04T05:30:41.281275Z INFO - athena.framework: Matched route 'view_controller_foo' -- route: "view_controller_foo", route_parameters: {"_route" => "view_controller_foo", # "_controller" => "ViewController#foo"}, request_uri: "/foo", method: "GET" # 2024-03-04T05:30:41.282632Z ERROR - athena.framework: Uncaught exception #<Athena::Framework::Exception::Logic:Failed to serialize response body. Did you forget to include # either `JSON::Serializable` or `ASR::Serializable`?> at src/components/framework/src/view/view_handler.cr:166:21 in 'init_response' # 2024-03-04T05:30:43.886367Z INFO - athena.framework: Matched route 'view_controller_bar' -- route: "view_controller_bar", route_parameters: {"_route" => "view_controller_bar", # "_controller" => "ViewController#bar"}, request_uri: "/bar", method: "GET"

**Examples:**

Example 1 (json):
```json
require "athena"

class ExampleController < ATH::Controller
  @[ARTA::Get("/divide/{num1}/{num2}")]
  def divide(num1 : Int32, num2 : Int32) : Int32
    num1 // num2
  end

  @[ARTA::Get("/divide_rescued/{num1}/{num2}")]
  def divide_rescued(num1 : Int32, num2 : Int32) : Int32
    num1 // num2
    # Rescue a non `ATH::Exception::HTTPException`
  rescue ex : DivisionByZeroError
    # in order to raise an `ATH::Exception::HTTPException` to provide a better error message to the client.
    raise ATH::Exception::BadRequest.new "Invalid num2:  Cannot divide by zero"
  end
end

ATH.run

# GET /divide/10/0          # => {"code":500,"message":"Internal Server Error"}
# GET /divide_rescued/10/0  # => {"code":400,"message":"Invalid num2:  Cannot divide by zero"}
# GET /divide_rescued/10/10 # => 1
```

Example 2 (swift):
```swift
2022-01-08T20:44:18.134423Z   INFO - athena.routing: Server has started and is listening at http://0.0.0.0:3000
2022-01-08T20:44:19.773376Z   INFO - athena.routing: Matched route 'example_controller_divide' -- route: "example_controller_divide", route_parameters: {"_route" => "example_controller_divide", "_controller" => "ExampleController#divide", "num1" => "10", "num2" => "0"}, request_uri: "/divide/10/0", method: "GET"
2022-01-08T20:44:19.892748Z  ERROR - athena.routing: Uncaught exception #<DivisionByZeroError:Division by 0> at /usr/lib/crystal/int.cr:141:7 in 'check_div_argument'
Division by 0 (DivisionByZeroError)
  from /usr/lib/crystal/int.cr:141:7 in 'check_div_argument'
  from /usr/lib/crystal/int.cr:105:5 in '//'
  from src/components/framework/src/athena.cr:206:5 in 'divide'
  from src/components/framework/src/ext/routing/annotation_route_loader.cr:8:5 in '->'
  from /usr/lib/crystal/primitives.cr:266:3 in 'execute'
  from src/components/framework/src/route_handler.cr:76:16 in 'handle_raw'
  from src/components/framework/src/route_handler.cr:19:5 in 'handle'
  from src/components/framework/src/athena.cr:161:27 in '->'
  from /usr/lib/crystal/primitives.cr:266:3 in 'process'
  from /usr/lib/crystal/http/server.cr:515:5 in 'handle_client'
  from /usr/lib/crystal/http/server.cr:468:13 in '->'
  from /usr/lib/crystal/primitives.cr:266:3 in 'run'
  from /usr/lib/crystal/fiber.cr:98:34 in '->'
  from ???

2022-01-08T20:45:10.803001Z   INFO - athena.routing: Matched route 'example_controller_divide_rescued' -- route: "example_controller_divide_rescued", route_parameters: {"_route" => "example_controller_divide_rescued", "_controller" => "ExampleController#divide_rescued", "num1" => "10", "num2" => "0"}, request_uri: "/divide_rescued/10/0", method: "GET"
2022-01-08T20:45:10.923945Z   WARN - athena.routing: Uncaught exception #<Athena::Framework::Exception::BadRequest:Invalid num2:  Cannot divide by zero> at src/components/framework/src/athena.cr:215:5 in 'divide_rescued'
Invalid num2:  Cannot divide by zero (Athena::Framework::Exception::BadRequest)
  from src/components/framework/src/athena.cr:215:5 in 'divide_rescued'
  from src/components/framework/src/ext/routing/annotation_route_loader.cr:8:5 in '->'
  from /usr/lib/crystal/primitives.cr:266:3 in 'execute'
  from src/components/framework/src/route_handler.cr:76:16 in 'handle_raw'
  from src/components/framework/src/route_handler.cr:19:5 in 'handle'
  from src/components/framework/src/athena.cr:161:27 in '->'
  from /usr/lib/crystal/primitives.cr:266:3 in 'process'
  from /usr/lib/crystal/http/server.cr:515:5 in 'handle_client'
  from /usr/lib/crystal/http/server.cr:468:13 in '->'
  from /usr/lib/crystal/primitives.cr:266:3 in 'run'
  from /usr/lib/crystal/fiber.cr:98:34 in '->'
  from ???

2022-01-08T20:45:14.132652Z   INFO - athena.routing: Matched route 'example_controller_divide_rescued' -- route: "example_controller_divide_rescued", route_parameters: {"_route" => "example_controller_divide_rescued", "_controller" => "ExampleController#divide_rescued", "num1" => "10", "num2" => "10"}, request_uri: "/divide_rescued/10/10", method: "GET"
```

Example 3 (markdown):
```markdown
Log.define_formatter SingleLineFormatter, "#{timestamp} #{severity} - #{source(after: ": ")}#{message}" \
                                          "#{data(before: " -- ")}#{context(before: " -- ")}"

# 2024-03-04T05:30:29.329041Z   INFO - athena.framework: Server has started and is listening at http://0.0.0.0:3000
# 2024-03-04T05:30:37.568264Z   INFO - athena.framework: Matched route 'view_controller_bar' -- route: "view_controller_bar", route_parameters: {"_route" => "view_controller_bar", # "_controller" => "ViewController#bar"}, request_uri: "/bar", method: "GET"
# 2024-03-04T05:30:40.280070Z   INFO - athena.framework: Matched route 'view_controller_foo' -- route: "view_controller_foo", route_parameters: {"_route" => "view_controller_foo", # "_controller" => "ViewController#foo"}, request_uri: "/foo", method: "GET"
# 2024-03-04T05:30:40.351541Z  ERROR - athena.framework: Uncaught exception #<Athena::Framework::Exception::Logic:Failed to serialize response body. Did you forget to include # either `JSON::Serializable` or `ASR::Serializable`?> at src/components/framework/src/view/view_handler.cr:166:21 in 'init_response'
# 2024-03-04T05:30:41.281275Z   INFO - athena.framework: Matched route 'view_controller_foo' -- route: "view_controller_foo", route_parameters: {"_route" => "view_controller_foo", # "_controller" => "ViewController#foo"}, request_uri: "/foo", method: "GET"
# 2024-03-04T05:30:41.282632Z  ERROR - athena.framework: Uncaught exception #<Athena::Framework::Exception::Logic:Failed to serialize response body. Did you forget to include # either `JSON::Serializable` or `ASR::Serializable`?> at src/components/framework/src/view/view_handler.cr:166:21 in 'init_response'
# 2024-03-04T05:30:43.886367Z   INFO - athena.framework: Matched route 'view_controller_bar' -- route: "view_controller_bar", route_parameters: {"_route" => "view_controller_bar", # "_controller" => "ViewController#bar"}, request_uri: "/bar", method: "GET"
```

---

## Why Athena

**URL:** https://athenaframework.org/why_athena/

**Contents:**
- Why Athena
- Creating "good" Software#
  - SOLID Principles#
    - Single Responsibility#
      - Services#
    - Dependency Inversion#
  - Flexibility#
    - Dependency Injection#
    - Middleware#
  - Annotations#

When creating an application, actually writing the code is often the easiest part. Designing a system that will be readable, maintainable, testable, and extensible on the other hand is a much more challenging task. The features of the Athena Framework encourage creating such software. However it does not do much good without also understanding the why behind the way it is designed the way it is. Let's take a moment to explore how the features mentioned in the introduction can lead to "good" software design.

As with anything in the software world, "good" software is subjective. The design decision/suggestions on this page are intended to be educational and provide "best practices" guidelines. They are NOT the only way to use the framework nor prescriptive. Do whatever makes the most sense for your project.

The SOLID principles are applicable to any Object Oriented Programming (OOP) language. They play a big part in the underlying architecture of the Athena Framework, and the overall ecosystem of Athena itself. There are plenty of resources online to learn more about all of the principles, but this section will focus on that of the Dependency Inversion and Single Responsibility principles and how an Inversion of Control (IoC) service container orchestrates it all via dependency injection.

Just as the name implies, this principle suggests that each type should have only a single primary purpose. Having types with specialized focuses has various benefits including:

A more concrete example of this could be say there is a class representing an article:

This type currently only has a single purpose which is representing an article. It also exposes some helper methods related to querying information about each article which are also valid under this principle. However, if a new method was added to persist the article to some location, the class would now no longer have just one purpose, thus violating the single responsibility principle.

In this example, it would be better to add another type, say ArticlePersister to handle this functionality:

A sharp eye will notice this type was created with the ADI::Register annotation applied to it. This registers the type as a service, which is essentially just a useful object that could be used by other services. Not all types are services though, such as the Article type. This is because it only stores data within the domain of the application and does not provide any useful functionality on its own. More on this topic in the dependency injection section.

This principle states that code should "Depend upon abstractions, [not] concretions." In other words, services should depend upon interfaces instead of concrete types. This not only makes the depending services more flexible since different implementations of the interface could be used, but also makes testing easier since mock implementations could also be used. In Crystal, an interface is nothing more than a module with abstract defs that can be included within another type in order to force the including type to define its methods.The example from the previous principle can be used to demonstrate.

The ArticlePersister can be used to persist an article. For example say there is another service in which an article should be persisted. This could be a controller action, a console command, some sort of async consumer, etc. The easiest way to handle persisting of the article would be to do something like:

However this has some problems since it tightly couples MyService to the ArticlePersister service. Not super ideal.

Moving the persister into an instance variable created within the constructor is a bit better but also suffers from the same issue. The ideal solution here would be to provide an ArticlePersister instance to MyService when it is instantiated:

The same behavior as before can also be retained, even when using this new pattern. This will use the provided instance, or fall back on a default implementation if no custom instance is provided:

Both of these latter two examples remove the tight coupling between the two services. However there is still one thing that is less than ideal. It should be possible to persist an article in multiple places. Meaning it needs to allow for more than one implementation of ArticlePersister that handles different locations, such as one for a database and another for the local filesystem. The best way to handle this would be to create an interface module for this type:

From here the constructor of MyService should be updated to be:

Additionally, a @[ADI::AsAlias] must be applied to the class. Also be sure to include the interface within ArticlePersister:

While this is a bit of extra boilerplate, it is an incredibly powerful pattern. It enables MyService to persist an article to anywhere, depending on what implementation instance it is instantiated with. The same pattern can be extended to make testing the service much easier. A mock implementation of ArticlePersisterInterface can be used to assert MyService calls with the proper arguments without testing more than is required.

Athena Framework is very flexible in that it is able to support both simple and complex use cases by adapting to the needs of the application without getting in the way of customizations the user wants to make. This is accomplished by providing all the components to the user, but not requiring they be used. If an application does not need to validate anything, the Athena::Validator component can just be ignored. But if the need ever arises it is there and well integrated into the framework.

Athena Framework includes an IoC Service Container that manages services automatically. Any service, or a useful type, annotated with ADI::Register, can be used in another service by defining a constructor typed to the desired service. For example:

It is worth noting again that while dependency injection is a big part of the framework, it is not necessarily required to fully understand it in order to use the framework, but like the other components, it is there if needed. Checkout ADI::Register, especially the aliasing services section.

Athena Framework is almost fully overridable/customizable in part since it embraces dependency injection. Want to globally customize how errors are rendered? Create a service implementing ATH::ErrorRendererInterface and make it an alias of the interface:

Athena Framework will pick this up and use it instead of the built in version without any other required configuration changes. The same concept applies to many different features within the framework that have their own interface/default implementation.

Unlike other frameworks, Athena Framework leverages event based middleware instead of a pipeline based approach. This enables a lot of flexibility in that there is nothing extra that needs to be done to register the listener other than creating a service for it:

Similarly, the framework itself is implemented using the same features available to the users. Thus it is very easy to run specific listeners before/after the built-in ones if so desired.

Check out the debug:event-dispatcher command for an easy way to see all the listeners and the order in which they are executed.

One of the more unique aspects of Athena Framework, and the Athena ecosystem, is its use of annotations as a means of configuring the framework. While not everyone may like their syntax, the benefits they provide are undeniable. The main benefit being they keep the code close to where it is used. The route of a controller action is declared directly above the method that handles it and not in some other file. Metadata associated with a specific service/route is also right there with the type itself.

A common way to do certain things in other frameworks is the use of macro DSLs specific to each framework. While it can work well, it makes it harder to expand upon/customize. Given annotations are a core Crystal language construct, there nothing special needed to access the annotations themselves. This can be especially useful for third party code to have a tighter integration while also being totally agnostic of what framework the code is even used in.

One of the most powerful features Athena Framework offers is that of custom user defined annotations which provide almost an infinite amount of use cases. These annotations could be applied to controller classes and/or controller actions to expose additional information to other services, such as event listeners or ATHR::Interfaces to customize their behavior on a case by case basis.

While the components that make up Athena Framework can be used within a wide range of applications, the framework itself is best suited for a few main types, including HTTP REST APIs, CLI Applications, or a combination of both. Since both types of entry points leverage dependency injection, services can be used in both contexts, allowing the majority of code to be reused.

At its core, Athena Framework is a MVC web application framework. It can be used to serve any kind of content, but best lends itself to creating RESTful JSON APIs due to the features explained in the previous section, as well as due its native JSON support:

Athena Framework can also be used to build CLI based applications. These could either be used directly by the end user, used for internal administrative tasks, or invoked on a schedule via cron or something similar.

Checkout the Console component for more information.

**Examples:**

Example 1 (python):
```python
class Article
  property title : String
  property author : String
  property body : String

  def initialize(@title : String, @author : String, @body : String); end

  def includes_word?(word : String) : Bool
    @body.includes? word
  end

  # ...
end
```

Example 2 (php):
```php
@[ADI::Register]
class ArticlePersister
  def persist(article : Article) : Nil
    # ...
  end
end
```

Example 3 (php):
```php
@[ADI::Register]
class MyService
  def execute
    article = # ...
    persister = ArticlePersister.new

    persister.persist article
  end
end
```

Example 4 (python):
```python
def initialize
  @persister = ArticlePersister.new
end
```

---

## class Athena::Console::Commands::List inherits Athena::Console::Command #

**URL:** https://athenaframework.org/Console/Commands/List/

**Contents:**
- class Athena::Console::Commands::List inherits Athena::Console::Command #

Lists the available commands, optionally only including those in a specific namespace.

---

## class Athena::Framework::Commands::DebugEventDispatcher inherits Athena::Console::Command #

**URL:** https://athenaframework.org/Framework/Commands/DebugEventDispatcher/

**Contents:**
- class Athena::Framework::Commands::DebugEventDispatcher inherits Athena::Console::Command #
- Constructors#
  - .new(dispatcher : AED::EventDispatcherInterface)#

Utility command to allow viewing information about an AED::EventDispatcherInterface. Includes the type/method of each event listener, along with the order they run in based on their priority. Accepts an optional argument to allow filtering the list to a specific event, or ones that contain the provided string.

Support dedicated AED::EventDispatcherInterface services other than the default.

**Examples:**

Example 1 (yaml):
```yaml
$ ./bin/console debug:event-dispatcher
Registered Listeners Grouped by Event
=====================================

Athena::Framework::Events::Exception event
------------------------------------------

 ------- -------------------------------------------------- ----------
  Order   Callable                                           Priority
 ------- -------------------------------------------------- ----------
  #1      Athena::Framework::Listeners::Error#on_exception   -50
 ------- -------------------------------------------------- ----------

Athena::Framework::Events::Request event
----------------------------------------

 ------- -------------------------------------------------- ----------
  Order   Callable                                           Priority
 ------- -------------------------------------------------- ----------
  #1      Athena::Framework::Listeners::CORS#on_request      250
  #2      Athena::Framework::Listeners::Format#on_request    34
  #3      Athena::Framework::Listeners::Routing#on_request   32
 ------- -------------------------------------------------- ----------

...
```

---

## module Athena::Framework::Console::CompilerPasses::RegisterCommands #

**URL:** https://athenaframework.org/Framework/Console/CompilerPasses/RegisterCommands/

**Contents:**
- module Athena::Framework::Console::CompilerPasses::RegisterCommands #
- Constants#
  - TAG = "athena.console.command"#

Contains types related to the Athena::Console integration.

---

## abstract struct Athena::Framework::Spec::APITestCase inherits Athena::Framework::Spec::WebTestCase #

**URL:** https://athenaframework.org/Framework/Spec/APITestCase/

**Contents:**
- abstract struct Athena::Framework::Spec::APITestCase inherits Athena::Framework::Spec::WebTestCase #
  - Usage#
    - Mocking External Dependencies#
- Constructors#
  - .new#
- Methods#
  - #client : ATH::Spec::HTTPBrowser#
  - #delete(path : String, headers : HTTP::Headers = HTTP::Headers.new) : HTTP::Server::Response#
  - #get(path : String, headers : HTTP::Headers = HTTP::Headers.new) : HTTP::Server::Response#
  - #head(path : String, headers : HTTP::Headers = HTTP::Headers.new) : HTTP::Server::Response#

A WebTestCase implementation with the intent of testing API controllers. Can be extended to add additional application specific configuration, such as setting up an authenticated user to make the request as.

Say we want to test the following controller:

We can define a struct inheriting from self to implement our test logic:

The #request method is used to make our requests to the API, then we run are assertions against the resulting HTTP::Server::Response. A key thing to point out is that there is no HTTP::Server involved, thus resulting in more performant specs.

Checkout the built in expectations to make testing easier.

Be sure to call Athena::Spec.run_all to your spec_helper.cr to ensure all test case instances are executed.

The previous example was quite simple. However, most likely a controller is going to have dependencies on various other services; such as an API client to make requests to a third party API. By default each test will be executed with the same services as it would normally, i.e. those requests to the third party API would actually be made. To solve this we can create a mock implementation of the API client and make it so that implementation is injected when the test runs.

See ADI::Spec::MockableServiceContainer for more details on mocking services.

Each test_* method has its own service container instance. Any services that are mutated/replaced within the initialize method will affect all test_* methods. However, services can also be mutated/replaced within specific test_* methods to scope it that particular test; just be sure that you do it before calling #request.

Returns a reference to the AbstractBrowser being used for the test.

Makes a DELETE request to the provided path, optionally with the provided headers.

Makes a GET request to the provided path, optionally with the provided headers.

Makes a HEAD request to the provided path, optionally with the provided headers.

Makes a LINK request to the provided path, optionally with the provided headers.

Makes a PATCH request to the provided path, optionally with the provided body and headers.

Makes a POST request to the provided path, optionally with the provided body and headers.

Makes a PUT request to the provided path, optionally with the provided body and headers.

See AbstractBrowser#request.

See AbstractBrowser#request.

Makes a UNLINK request to the provided path, optionally with the provided headers.

**Examples:**

Example 1 (php):
```php
class ExampleController < ATH::Controller
  @[ARTA::Get("/add/{value1}/{value2}")]
  def add(value1 : Int32, value2 : Int32, @[ATHA::MapQueryParameter] negative : Bool = false) : Int32
    sum = value1 + value2
    negative ? -sum : sum
  end
end
```

Example 2 (julia):
```julia
struct ExampleControllerTest < ATH::Spec::APITestCase
  def test_add_positive : Nil
    self.get("/add/5/3").body.should eq "8"
  end

  def test_add_negative : Nil
    self.get("/add/5/3?negative=true").body.should eq "-8"
  end
end
```

Example 3 (python):
```python
# Create an example API client.
@[ADI::Register]
class APIClient
  def fetch_latest_data : String
    # Assume this method actually makes an `HTTP` request to get the latest data.
    "DATA"
  end
end

# Define a mock implementation of our APIClient that does not make a request and just returns mock data.
class MockAPIClient < APIClient
  def fetch_latest_data : String
    # This could also be an instance variable that gets set when this mock is created.
    "MOCK_DATA"
  end
end

# Enable our API client to be replaced in the service container.
class ADI::Spec::MockableServiceContainer
  # Use the block version of the `property` macro to use our mocked client by default, while still allowing it to be replaced at runtime.
  #
  # The block version of `getter` could also be used if you don't need to set it at runtime.
  # The `setter` macro could be also if you only want to allow replacing it at runtime.
  property(api_client) { MockAPIClient.new }
end

@[ADI::Register]
class ExampleServiceController < ATH::Controller
  def initialize(@api_client : APIClient); end

  @[ARTA::Post("/sync")]
  def sync_data : String
    # Use the injected api client to get the latest data to sync.
    data = @api_client.fetch_latest_data

    # ...

    data
  end
end

struct ExampleServiceControllerTest < ATH::Spec::APITestCase
  def initialize
    super

    # Our API client could also have been replaced at runtime;
    # such as if you wanted provide it what data it should return on a test by test basis.
    # self.client.container.api_client = MockAPIClient.new
  end

  def test_sync_data : Nil
    self.post("/sync").body.should eq %("MOCK_DATA")
  end
end
```

---

## Introduction

**URL:** https://athenaframework.org/Routing/

**Contents:**
- Introduction
- Installation#
- Usage#
  - Simple Webapp#
- Learn More#

The Athena::Routing component provides a performant and robust HTTP based routing library/framework.

First, install the component by adding the following to your shard.yml, then running shards install:

This component is primarily intended to be used as a basis for a routing implementation for a framework, handling the majority of the heavy lifting.

The routing component supports various ways to control which routes are matched, including:

Using the routing component involves adding ART::Route instances to an ART::RouteCollection. The collection is then compiled via ART.compile. From here, an ART::Matcher::URLMatcherInterface or ART::Matcher::RequestMatcherInterface could then be used to determine which route matches a given path or ART::Request.

It is also possible to go the other way, generate a URL based on its name and set of parameters:

The Crystal stdlib provides HTTP::Server as a very robust basis to a web application. However it lacks a fairly critical feature: routing. The Routing component provides ART::RoutingHandler which can be used to add basic routing functionality. This can be a good choice for super simple web applications that do not need any additional frameworky features.

**Examples:**

Example 1 (yaml):
```yaml
dependencies:
  athena-routing:
    github: athena-framework/routing
    version: ~> 0.1.0
```

Example 2 (sql):
```sql
# Create a new route collection and add a route with a single parameter to it.
routes = ART::RouteCollection.new
routes.add "blog_show", ART::Route.new "/blog/{slug}"

# Compile the routes.
ART.compile routes

# Represents the request in an agnostic data format.
# In practice this would be created from the current `ART::Request`.
context = ART::RequestContext.new

# Match a request by path.
matcher = ART::Matcher::URLMatcher.new context
matcher.match "/blog/foo-bar" # => {"_route" => "blog_show", "slug" => "foo-bar"}
```

Example 3 (markdown):
```markdown
# Generating routes based on route name and parameters is also possible.
generator = ART::Generator::URLGenerator.new context
generator.generate "blog_show", slug: "bar-baz", source: "Crystal" # => "/blog/bar-baz?source=Crystal"
```

Example 4 (julia):
```julia
handler = ART::RoutingHandler.new

# The `methods` property can be used to limit the route to a particular HTTP method.
handler.add "new_article", ART::Route.new("/article", methods: "post") do |ctx|
  pp ctx.request.body.try &.gets_to_end
end

# The match parameters from the route are passed to the callback as a `Hash(String, String?)`.
handler.add "article", ART::Route.new("/article/{id<\\d+>}", methods: "get") do |ctx, params|
  pp params # => {"_route" => "article", "id" => "10"}
end

# Call the `#compile` method when providing the handler to the handler array.
server = HTTP::Server.new([
  handler.compile,
])

address = server.bind_tcp 8080
puts "Listening on http://#{address}"
server.listen
```

---

## Getting Started

**URL:** https://athenaframework.org/getting_started/

**Contents:**
- Getting Started
- Install Athena Framework#

Athena Framework does not have any other dependencies outside of Crystal and Shards. It is designed in such a way to be non-intrusive and not require a strict organizational convention in regards to how a project is setup; this allows it to use a minimal amount of setup boilerplate while not preventing it for more complex projects.

Add the framework component to your shard.yml:

Then run shards install. This will install the framework component and its required component dependencies. Finally require it via require "athena", then are all set to starting using the framework, starting with Routing & HTTP.

Check out the skeleton template repository to get up and running quickly.

**Examples:**

Example 1 (yaml):
```yaml
dependencies:
  athena:
    github: athena-framework/framework
    version: ~> 0.21.0
```

---

## annotation Athena::Routing::Annotations::Get #

**URL:** https://athenaframework.org/Routing/Annotations/Get/

**Contents:**
- annotation Athena::Routing::Annotations::Get #

Same as ARTA::Route, but only matches the GET method.

---

## annotation Athena::Routing::Annotations::Post #

**URL:** https://athenaframework.org/Routing/Annotations/Post/

**Contents:**
- annotation Athena::Routing::Annotations::Post #

Same as ARTA::Route, but only matches the POST method.

---

## class Athena::Console::Commands::Generic inherits Athena::Console::Command #

**URL:** https://athenaframework.org/Console/Commands/Generic/

**Contents:**
- class Athena::Console::Commands::Generic inherits Athena::Console::Command #
- Constructors#
  - .new(name : String, &callback : ACON::Commands::Generic::Proc)#

A generic implementation of ACON::Command that is instantiated with a block that will be executed as part of the #execute method.

This is the command class used as part of ACON::Application#register.

---

## Validation

**URL:** https://athenaframework.org/getting_started/validation/

**Contents:**
- Validation
- Custom Constraints#

The Athena::Validator component adds a robust/flexible validation framework. This component is also mostly optional, but is leveraged for the super useful ATHR::RequestBody resolver type to ensure only valid data make it into the system. This component can also be used to define validation requirements for ATH::Params::ParamInterfaces.

In addition to the general information for defining Custom Constraints, the validator component defines a specific type for defining service based constraint validators: AVD::ServiceConstraintValidator. This type should be inherited from instead of AVD::ConstraintValidator IF the validator for your custom constraint needs to be a service, E.x.

**Examples:**

Example 1 (python):
```python
class Athena::Validator::Constraints::CustomConstraint < AVD::Constraint
  # ...

  @[ADI::Register]
  struct Validator < AVD::ServiceConstraintValidator
    def initialize(...); end

    # :inherit:
    def validate(value : _, constraint : AVD::Constraints::CustomConstraint) : Nil
      # ...
    end
  end
end
```

---

## annotation Athena::Routing::Annotations::Patch #

**URL:** https://athenaframework.org/Routing/Annotations/Patch/

**Contents:**
- annotation Athena::Routing::Annotations::Patch #

Same as ARTA::Route, but only matches the PATCH method.

---

## struct Athena::Framework::Listeners::Routing inherits Struct #

**URL:** https://athenaframework.org/Framework/Listeners/Routing/

**Contents:**
- struct Athena::Framework::Listeners::Routing inherits Struct #
- Constructors#
  - .new(matcher : ART::Matcher::URLMatcherInterface | ART::Matcher::RequestMatcherInterface, request_store : ATH::RequestStore, request_context : ART::RequestContext | Nil = nil)#
- Methods#
  - #on_request(event : ATH::Events::Request) : Nil#

Sets the related ATH::Action on the current request via an ART::RequestMatcherInterface.

---

## class Athena::Routing::RouteCollection inherits Reference #

**URL:** https://athenaframework.org/Routing/RouteCollection/

**Contents:**
- class Athena::Routing::RouteCollection inherits Reference #
  - Route Priority#
- Included modules
- Methods#
  - #[](name : String) : ART::Route#
  - #[]?(name : String) : ART::Route | Nil#
  - #add(name : String, route : ART::Route, priority : Int32 = 0) : Nil#
  - #add(collection : self) : Nil#
  - #add_defaults(defaults : Hash(String, _)) : Nil#
  - #add_name_prefix(prefix : String) : Nil#

Represents a collection of ART::Routes. Provides a way to traverse, edit, remove, and access the stored routes.

Each route has an associated name that should be unique. Adding another route with the same name will override the previous one.

When determining which route should match, the first matching route will win. For example, if two routes were added with variable parameters in the same location, the first one that was added would match regardless of what their requirements are. In most cases this will not be a problem, but in some cases you may need to ensure a particular route is checked first.

The priority argument within #add can be used to control this order.

Returns the ART::Action with the provided name.

Raises a ART::Exception::RouteNotFound if a route with the provided name does not exist.

Returns the ART::Action with the provided name, or nil if it does not exist.

Adds the provided route with the provided name to this collection, optionally with the provided priority.

Adds all the routes from the provided collection to this collection.

Adds the provided prefix to the name of all routes stored within this collection.

Adds a path prefix to all routes stored in this collection. Optionally allows merging in additional defaults or requirements.

Merges the provided requirements into all routes stored within this collection.

Returns a copy of self with all instance variables cloned.

Yields the name and ART::Route object for each registered route.

Returns an Iterator for each registered route.

Sets the method(s) of all routes stored within this collection.

Removes the route with the provide name.

Removes the routes with the provide names.

Returns the routes stored within this collection.

Sets the scheme(s) of all routes stored within this collection.

Sets the host property of all routes stored in this collection. Optionally allows merging in additional defaults or requirements.

Returns the number of routes stored within this collection.

---

## annotation Athena::Routing::Annotations::Delete #

**URL:** https://athenaframework.org/Routing/Annotations/Delete/

**Contents:**
- annotation Athena::Routing::Annotations::Delete #

Same as ARTA::Route, but only matches the DELETE method.

---

## abstract struct Athena::DependencyInjection::AnnotationConfigurations::ConfigurationBase inherits Struct #

**URL:** https://athenaframework.org/DependencyInjection/AnnotationConfigurations/ConfigurationBase/

**Contents:**
- abstract struct Athena::DependencyInjection::AnnotationConfigurations::ConfigurationBase inherits Struct #
- Constructors#
  - .new#
- Methods#
  - #initialize#

Base type of annotation configuration objects registered via Athena::DependencyInjection.configuration_annotation.

---

## class Athena::Routing::Generator::URLGenerator inherits Reference #

**URL:** https://athenaframework.org/Routing/Generator/URLGenerator/

**Contents:**
- class Athena::Routing::Generator::URLGenerator inherits Reference #
- Included modules
- Constructors#
  - .new(context : ART::RequestContext, default_locale : String | Nil = nil, route_provider : ART::RouteProvider.class = ART::RouteProvider)#
- Methods#
  - #context : ART::RequestContext#
  - #context=(context : ART::RequestContext)#
  - #generate(route : String, params : Hash(String, String | Nil) = Hash(String, String | ::Nil).new, reference_type : ART::Generator::ReferenceType = :absolute_path) : String#
  - #generate(route : String, params : Hash(String, _) = Hash(String, String | ::Nil).new, reference_type : ART::Generator::ReferenceType = :absolute_path) : String#
  - #generate(route : String, reference_type : ART::Generator::ReferenceType = :absolute_path, **params) : String#

Default implementation of ART::Generator::Interface.

Returns the request context.

Sets the request context.

Generates a URL for the provided route, optionally with the provided params and reference_type.

Generates a URL for the provided route, optionally with the provided params and reference_type.

Sets how invalid parameters should be treated:

Returns the current strict requirements mode.

---

## class Athena::Framework::Commands::DebugRouter inherits Athena::Console::Command #

**URL:** https://athenaframework.org/Framework/Commands/DebugRouter/

**Contents:**
- class Athena::Framework::Commands::DebugRouter inherits Athena::Console::Command #
- Constructors#
  - .new(router : ART::RouterInterface)#

Utility command to allow viewing all of the routes the framework is aware of within your application.

The command also supports viewing additional information about a specific route: $ ./bin/console debug:router test +--------------+-------------------------------------+ | Property | Value | +--------------+-------------------------------------+ | Route Name | test | | Path | /{id}/{a} | | Path Regex | ^/(?P<id>\d+)/(?P<a>10)$ | | Host | ANY | | Host Regex | | | Scheme | ANY | | Methods | GET | | Requirements | a: 10 | | | id: \d+ | | Class | Athena::Routing::Route | | Defaults | _controller: ExampleController#root | +--------------+-------------------------------------+

Checkout ATH::Commands::DebugRouterMatch to test which route a given path resolves to.

**Examples:**

Example 1 (swift):
```swift
$ ./bin/console debug:router
----------------  -------  -------  -----  --------------------------------------------
Name              Method   Scheme   Host   Path
----------------  -------  -------  -----  --------------------------------------------
homepage          ANY      ANY      ANY    /
contact           GET      ANY      ANY    /contact
contact_process   POST     ANY      ANY    /contact
article_show      ANY      ANY      ANY    /articles/{_locale}/{year}/{title}.{_format}
blog              ANY      ANY      ANY    /blog/{page}
blog_show         ANY      ANY      ANY    /blog/{slug}
----------------  -------  -------  -----  --------------------------------------------
```

Example 2 (typescript):
```typescript
$ ./bin/console debug:router test
+--------------+-------------------------------------+
| Property     | Value                               |
+--------------+-------------------------------------+
| Route Name   | test                                |
| Path         | /{id}/{a}                           |
| Path Regex   | ^/(?P<id>\d+)/(?P<a>10)$            |
| Host         | ANY                                 |
| Host Regex   |                                     |
| Scheme       | ANY                                 |
| Methods      | GET                                 |
| Requirements | a: 10                               |
|              | id: \d+                             |
| Class        | Athena::Routing::Route              |
| Defaults     | _controller: ExampleController#root |
+--------------+-------------------------------------+
```

---
