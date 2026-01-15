# Athena-Framework - Framework

**Pages:** 332

---

## module Athena::Spec::Methods #

**URL:** https://athenaframework.org/Spec/Methods/

**Contents:**
- module Athena::Spec::Methods #
- Extended modules
- Direct including types
- Methods#
  - #assert_compile_time_error(message : String, code : String, *, line : Int32 = __LINE__, file : String = __FILE__) : Nil#
  - #assert_compiles(code : String, *, line : Int32 = __LINE__, file : String = __FILE__) : Nil#
  - #assert_executes(code : String, *, line : Int32 = __LINE__, file : String = __FILE__) : Nil#
  - #assert_runtime_error(message : String, code : String, *, line : Int32 = __LINE__, file : String = __FILE__) : Nil#
  - #run_executable(path : String, args : Array(String) = [] of String, & : String, String, Process::Status -> ) : Nil#
  - #run_executable(path : String, input : IO, args : Array(String) = [] of String, & : String, String, Process::Status -> ) : Nil#

Namespace for common/helpful testing methods.

This module can be included into your spec_helper in order to allow your specs to use them all. This module is also included into ASPEC::TestCase by default to allow using them within your unit tests as well.

May be reopened to add additional application specific helpers.

Executes the provided Crystal code and asserts it results in a compile time error with the provided message.

When files are required within the code, they are relative to the file calling this method.

Similar to .assert_compile_time_error, but asserts the provided Crystal code successfully compiles.

When files are required within the code, they are relative to the file calling this method.

Similar to .assert_runtime_error, but asserts the provided Crystal code successfully executes.

When files are required within the code, they are relative to the file calling this method.

Executes the provided Crystal code and asserts it results in a runtime error with the provided message. This can be helpful in order to test something in isolation, without affecting other test cases.

When files are required within the code, they are relative to the file calling this method.

Runs the executable at the given path, optionally with the provided args.

The standard output, error output, and status of the execution are yielded.

Runs the executable at the given path, with the given input, optionally with the provided args.

The standard output, error output, and status of the execution are yielded.

**Examples:**

Example 1 (php):
```php
ASPEC::Methods.assert_compile_time_error "can't instantiate abstract class Foo", <<-CR
  abstract class Foo; end
  Foo.new
CR
```

Example 2 (r):
```r
ASPEC::Methods.assert_compiles <<-CR
  raise "Still passes"
CR
```

Example 3 (r):
```r
ASPEC::Methods.assert_executes <<-CR
  puts 2 + 2
CR
```

Example 4 (r):
```r
ASPEC::Methods.assert_runtime_error "Oh noes!", <<-CR
 raise "Oh noes!"
CR
```

---

## Aliases

**URL:** https://athenaframework.org/ImageSize/aliases/

**Contents:**
- Aliases
- alias AIS #
  - Alias definition

Convenience alias to make referencing Athena::ImageSize types easier.

---

## annotation Athena::DependencyInjection::Inject #

**URL:** https://athenaframework.org/DependencyInjection/Inject/

**Contents:**
- annotation Athena::DependencyInjection::Inject #

Specifies which constructor should be used for injection.

Without the ADI::Inject annotation, the first initializer would be used, which would fail since we are not providing a value for the active argument. ADI::Inject allows telling the service container that it should use the second constructor when registering this service. This allows a constructor overload specific to DI to be used while still allowing the type to be used outside of DI via other constructors.

Using the ADI::Inject annotation on a class method also acts a shortcut for defining a service factory.

**Examples:**

Example 1 (python):
```python
@[ADI::Register(_value: 2, public: true)]
class SomeService
  @active : Bool = false

  def initialize(value : String, @active : Bool)
    @value = value.to_i
  end

  @[ADI::Inject]
  def initialize(@value : Int32); end
end

ADI.container.some_service # => #<SomeService:0x7f51a77b1eb0 @active=false, @value=2>
SomeService.new "1", true  # => #<SomeService:0x7f51a77b1e90 @active=true, @value=1>
```

---

## abstract class Athena::EventDispatcher::Event inherits Athena::Contracts::EventDispatcher::Event #

**URL:** https://athenaframework.org/EventDispatcher/Event/

**Contents:**
- abstract class Athena::EventDispatcher::Event inherits Athena::Contracts::EventDispatcher::Event #
  - Generics#
- Direct known subclasses
- Class methods#
  - .callable(*, priority : Int32 = 0, name : String | Nil = nil, &block : self, AED::EventDispatcherInterface -> Nil) : AED::Callable#

Extension of ACTR::EventDispatcher::Event to add additional functionality.

Events with generic type variables are also supported, the AED::GenericEvent event is an example of this. Listeners on events with generics are a bit unique in how they behave in that each unique instantiation is treated as its own event. For example:

Notice that the listeners are registered with the generic types included. This allows the component to treat AED::GenericEvent(String, Int32) differently than AED::GenericEvent(String, String). The added benefit of this is that the listener is also aware of the type returned by the related methods, so no manual casting is required.

Use type aliases to give better names to commonly used generic types. alias UserCreatedEvent = AED::GenericEvent(User, String)

Returns an AED::Callable based on the event class the method was called on. Optionally allows customizing the priority and name of the listener.

Essentially the same as using AED::EventDispatcherInterface#listener(event_class,*,priority,&), but removes the need to pass the event_class.

**Examples:**

Example 1 (php):
```php
class Foo; end

subject = Foo.new

dispatcher.listener AED::GenericEvent(Foo, Int32) do |e|
  e["counter"] += 1
end

dispatcher.listener AED::GenericEvent(String, String) do |e|
  e["class"] = e.subject.upcase
end

dispatcher.dispatch AED::GenericEvent.new subject, data = {"counter" => 0}

data["counter"] # => 1

dispatcher.dispatch AED::GenericEvent.new "foo", data = {"bar" => "baz"}

data["class"] # => "FOO"
```

Example 2 (julia):
```julia
alias UserCreatedEvent = AED::GenericEvent(User, String)
```

Example 3 (php):
```php
class MyEvent < AED::Event; end

callable = MyEvent.callable do |event, dispatcher|
  # Do something with the event, and/or dispatcher
end

dispatcher.listener callable
```

---

## enum Athena::ImageSize::Image::Format #

**URL:** https://athenaframework.org/ImageSize/Image/Format/

**Contents:**
- enum Athena::ImageSize::Image::Format #
- Members#
  - APNG = 0#
  - BMP = 1#
  - CUR = 2#
  - GIF = 3#
  - ICO = 4#
  - JPEG = 5#
  - MNG = 6#
  - PNG = 7#

Enumerates the supported image formats.

Returns true if this enum value equals APNG

Returns true if this enum value equals BMP

Returns true if this enum value equals CUR

Returns true if this enum value equals GIF

Returns true if this enum value equals ICO

Returns true if this enum value equals JPEG

Returns true if this enum value equals MNG

Returns true if this enum value equals PNG

Returns true if this enum value equals PSD

Returns true if this enum value equals SVG

Returns true if this enum value equals SWF

Returns true if this enum value equals TIFF

Returns true if this enum value equals WEBP

---

## Aliases

**URL:** https://athenaframework.org/Clock/aliases/

**Contents:**
- Aliases
- alias ACLK #
  - Alias definition

Convenience alias to make referencing Athena::Clock types easier.

---

## enum Athena::Framework::BinaryFileResponse::ContentDisposition #

**URL:** https://athenaframework.org/Framework/BinaryFileResponse/ContentDisposition/

**Contents:**
- enum Athena::Framework::BinaryFileResponse::ContentDisposition #
- Members#
  - Attachment = 0#
  - Inline = 1#
- Methods#
  - #attachment?#
  - #inline?#
  - #to_s : String#

Represents the possible content-disposition header values.

Indicates that the file should be downloaded.

Indicates that the browser should display the file inside the Web page, or as the Web page.

Returns true if this enum value equals Attachment

Returns true if this enum value equals Inline

Returns a String representation of this enum member. In the case of regular enums, this is just the name of the member. In the case of flag enums, it's the names joined by vertical bars, or "None", if the value is zero.

If an enum's value doesn't match a member's value, the raw value is returned as a string.

**Examples:**

Example 1 (yaml):
```yaml
Color::Red.to_s                     # => "Red"
IOMode::None.to_s                   # => "None"
(IOMode::Read | IOMode::Write).to_s # => "Read | Write"

Color.new(10).to_s # => "10"
```

---

## module Athena::Console::Output::Interface #

**URL:** https://athenaframework.org/Console/Output/Interface/

**Contents:**
- module Athena::Console::Output::Interface #
- Direct including types
- Methods#
  - abstract #decorated=(decorated : Bool) : Nil#
  - abstract #decorated? : Bool#
  - abstract #formatter : ACON::Formatter::Interface#
  - abstract #formatter=(formatter : ACON::Formatter::Interface) : Nil#
  - abstract #print(message : String | Enumerable(String), verbosity : ACON::Output::Verbosity = :normal, output_type : ACON::Output::Type = :normal) : Nil#
  - abstract #puts(message : String | Enumerable(String), verbosity : ACON::Output::Verbosity = :normal, output_type : ACON::Output::Type = :normal) : Nil#
  - abstract #verbosity : ACON::Output::Verbosity#

Athena::Console uses a dedicated interface for representing an output destination. This allows it to have multiple more specialized implementations as opposed to being tightly coupled to STDOUT or a raw IO. This interface represents the methods that must be implemented, however implementations can add additional functionality.

The most common implementations include ACON::Output::ConsoleOutput which is based on STDOUT and STDERR, and ACON::Output::Null which can be used when you want to silent all output, such as for tests.

Each output's ACON::Output::Verbosity and output ACON::Output::Type can also be configured on a per message basis.

Sets if printed messages should be decorated.

Returns true if printed messages should have their decorations applied. I.e. ACON::Formatter::OutputStyleInterface.

Returns the ACON::Formatter::Interface used by self.

Sets the ACON::Formatter::Interface used by self.

Outputs the provided message. The verbosity and/or output_type parameters can be used to control when and how the message is printed.

Outputs the provided message followed by a new line. The verbosity and/or output_type parameters can be used to control when and how the message is printed.

Returns the minimum ACON::Output::Verbosity required for a message to be printed.

Set the minimum ACON::Output::Verbosity required for a message to be printed.

---

## module Athena::Console::Input::Streamable #

**URL:** https://athenaframework.org/Console/Input/Streamable/

**Contents:**
- module Athena::Console::Input::Streamable #
- Included modules
- Direct including types
- Methods#
  - abstract #stream : IO | ::Nil#
  - abstract #stream=(stream : IO | Nil)#

An extension of ACON::Input::Interface that supports input stream IOs.

Allows customizing where the input data is read from. Defaults to STDIN.

Returns the input stream.

Sets the input stream.

---

## struct Athena::Framework::Listeners::CORS inherits Struct #

**URL:** https://athenaframework.org/Framework/Listeners/CORS/

**Contents:**
- struct Athena::Framework::Listeners::CORS inherits Struct #
- Constants#
  - SAFELISTED_HEADERS = ["accept", "accept-language", "content-language", "content-type", "origin"]#
  - SAFELISTED_METHODS = ["GET", "POST", "HEAD"]#
- Methods#
  - #on_request(event : ATH::Events::Request) : Nil#
  - #on_response(event : ATH::Events::Response) : Nil#

Supports Cross-Origin Resource Sharing (CORS) requests.

Handles CORS preflight OPTIONS requests as well as adding CORS headers to each response. See ATH::Bundle::Schema::Cors for information on configuring the listener.

Set your Log::Severity to TRACE to help debug the listener.

The CORS-safelisted request-headers.

The CORS-safelisted methods.

---

## module Athena::Serializer::Serializable #

**URL:** https://athenaframework.org/Serializer/Serializable/

**Contents:**
- module Athena::Serializer::Serializable #

Adds the necessary methods to a struct/class to allow for (de)serialization of that type.

**Examples:**

Example 1 (json):
```json
require "athena-serializer"

record Example, id : Int32, name : String do
  include ASR::Serializable
end

obj = ASR.serializer.deserialize Example, %({"id":1,"name":"George"}), :json
obj                                 # => Example(@id=1, @name="George")
ASR.serializer.serialize obj, :yaml # =>
# ---
# id: 1
# name: George
```

---

## enum Athena::Console::Input::Argument::Mode #

**URL:** https://athenaframework.org/Console/Input/Argument/Mode/

**Contents:**
- enum Athena::Console::Input::Argument::Mode #
- Members#
  - REQUIRED = 1#
  - OPTIONAL = 2#
  - IS_ARRAY = 4#
  - None = 0#
  - All = 7#
- Methods#
  - #is_array?#
  - #none?#

Represents the possible modes of an ACON::Input::Argument, that describe the "type" of the argument.

Modes can also be combined using the Enum.[] macro. For example, ACON::Input::Argument::Mode[:required, :is_array] which defines a required array argument.

Represents a required argument that MUST be provided. Otherwise the command will not run.

Represents an optional argument that could be omitted.

Represents an argument that accepts a variable amount of values. Arguments of this type must be last.

Returns true if this enum value contains IS_ARRAY

Returns true if this enum value contains OPTIONAL

Returns true if this enum value contains REQUIRED

---

## struct Athena::Framework::RequestMatcher::Header inherits Struct #

**URL:** https://athenaframework.org/Framework/RequestMatcher/Header/

**Contents:**
- struct Athena::Framework::RequestMatcher::Header inherits Struct #
- Included modules
- Constructors#
  - .new(headers : Array(String))#
  - .new(*headers : String)#
- Methods#
  - #matches?(request : ATH::Request) : Bool#

Checks the presence of HTTP headers in an ATH::Request.

Decides whether the rule(s) implemented by the strategy matches the provided request.

---

## module Athena::Framework::Spec::Expectations::HTTP #

**URL:** https://athenaframework.org/Framework/Spec/Expectations/HTTP/

**Contents:**
- module Athena::Framework::Spec::Expectations::HTTP #
- Direct including types
- Methods#
  - #assert_cookie_has_value(name : String, value : String, path : String | Nil = nil, domain : String | Nil = nil, description : String | Nil = nil, *, file : String = __FILE__, line : Int32 = __LINE__) : Nil#
  - #assert_request_attribute_equals(name : String, value : _, description : String | Nil = nil, *, file : String = __FILE__, line : Int32 = __LINE__) : Nil#
  - #assert_response_format_equals(format : String, description : String | Nil = nil, *, file : String = __FILE__, line : Int32 = __LINE__) : Nil#
  - #assert_response_has_cookie(name : String, path : String | Nil = nil, domain : String | Nil = nil, description : String | Nil = nil, *, file : String = __FILE__, line : Int32 = __LINE__) : Nil#
  - #assert_response_has_header(name : String, description : String | Nil = nil, *, file : String = __FILE__, line : Int32 = __LINE__) : Nil#
  - #assert_response_has_status(status : ::HTTP::Status | Int32, description : String | Nil = nil, *, file : String = __FILE__, line : Int32 = __LINE__) : Nil#
  - #assert_response_header_equals(name : String, value : String, description : String | Nil = nil, *, file : String = __FILE__, line : Int32 = __LINE__) : Nil#

Provides expectation helper method for making assertions about the ATH::Request and/or HTTP::Server::Response of a controller action. For example asserting the response is successful, has a specific header/cookie (value), and/or if the request has an attribute with a specific value.

Some expectations will also print more information upon failure to make it easier to understand why it failed. #assert_response_is_successful for example will include the response status, headers, and body as well as the exception that caused the failure if applicable.

Asserts the value of the cookie with the provided name, and optionally path and domain, equals that of the provided value

Asserts the request attribute with the provided name equals the provided value.

Asserts the format of the response equals the provided format.

Asserts the response has a cookie with the provided name, and optionally path and domain.

Asserts the response has a header with the provided name.

Asserts the response has the same status as the one provided.

Asserts the value of the header with the provided name, equals that of the provided value.

Asserts the value of the header with the provided name, does not equal that of the provided value.

Asserts the response returns with a successful? status code.

Asserts the response returns with status of 422 Unprocessable Entity.

Asserts the response does not have a cookie with the provided name, and optionally path and domain.

Asserts the response does not have a header with the provided name.

Asserts the response returns with a redirection? status code. Optionally allows also asserting the location header is that of the provided location, and/or the status is equal to the provided status.

Asserts the request was matched against the route with the provided name.

**Examples:**

Example 1 (julia):
```julia
struct ExampleControllerTest < ATH::Spec::APITestCase
  def test_root : Nil
    self.get "/"

    self.assert_response_is_successful
  end
end
```

---

## module Athena::Console::Output::ConsoleOutputInterface #

**URL:** https://athenaframework.org/Console/Output/ConsoleOutputInterface/

**Contents:**
- module Athena::Console::Output::ConsoleOutputInterface #
- Direct including types
- Methods#
  - abstract #error_output : ACON::Output::Interface#
  - abstract #error_output=(stderr : ACON::Output::Interface) : Nil#
  - abstract #section : ACON::Output::Section#

Extension of ACON::Output::Interface that adds additional functionality for terminal based outputs.

Returns an ACON::Output::Interface that represents STDERR.

Sets the ACON::Output::Interface that represents STDERR.

---

## annotation Athena::Serializer::Annotations::IgnoreOnSerialize #

**URL:** https://athenaframework.org/Serializer/Annotations/IgnoreOnSerialize/

**Contents:**
- annotation Athena::Serializer::Annotations::IgnoreOnSerialize #
  - Example#

Indicates that a property should be set on deserialization, but should not be serialized.

**Examples:**

Example 1 (json):
```json
class Example
  include ASR::Serializable

  property name : String

  @[ASRA::IgnoreOnSerialize]
  property password : String?
end

obj = ASR.serializer.deserialize Example, %({"name":"Jim","password":"monkey123"}), :json

obj.password # => monkey123
obj.name     # => Jim

obj.password = "foobar"

ASR.serializer.serialize obj, :json # => {"name":"Jim"}
```

---

## struct Athena::EventDispatcher::Callable::EventDispatcher(E) inherits Athena::EventDispatcher::Callable #

**URL:** https://athenaframework.org/EventDispatcher/Callable/EventDispatcher/

**Contents:**
- struct Athena::EventDispatcher::Callable::EventDispatcher(E) inherits Athena::EventDispatcher::Callable #
- Constructors#
  - .new(callback : E, AED::EventDispatcherInterface -> Nil, priority : Int32 = 0, name : String | Nil = nil, event_class : E.class = E)#

Represents a listener that accepts both the AED::Event instance and the AED::EventDispatcherInterface instance. Such as when using AED::EventDispatcherInterface#listener(event_class,*,priority,&), or the AED::Event.callable method.

---

## struct Athena::Framework::Controller::ValueResolvers::RequestAttribute inherits Struct #

**URL:** https://athenaframework.org/Framework/Controller/ValueResolvers/RequestAttribute/

**Contents:**
- struct Athena::Framework::Controller::ValueResolvers::RequestAttribute inherits Struct #
- Included modules
- Constructors#
  - .new#
- Methods#
  - #initialize#
  - #resolve(request : ATH::Request, parameter : ATH::Controller::ParameterMetadata)#

Handles resolving a value that is stored in the request's ATH::Request#attributes. This includes any path/query parameters, custom values stored via an event listener, or extra defaults stored within the routing annotation.

Returns a value resolved from the provided request and parameter if possible, otherwise returns nil if no parameter could be resolved.

**Examples:**

Example 1 (julia):
```julia
@[ARTA::Get("/{id}")]
def get_id(id : Int32) : Int32
  id
end
```

---

## abstract class Athena::Validator::Constraint inherits Reference #

**URL:** https://athenaframework.org/Validator/Constraint/

**Contents:**
- abstract class Athena::Validator::Constraint inherits Reference #
  - Usage#
  - Arguments#
    - Default Argument#
    - Message Plurality#
    - Payload#
  - Validation Groups#
  - Custom Constraints#
- Direct known subclasses
- Constants#

Athena::Validator validates values/objects against a set of constraints, i.e. rules. Each constraint makes an assertive statement that some condition is true. Given a value, a constraint will tell you if that value adheres to the rules of the constraint. An example of this could be asserting a value is not blank, or greater than or equal to another value.

It's important to note a constraint does not implement the validation logic itself. Instead, this is handled via an AVD::ConstraintValidator as defined via #validated_by. Having this abstraction allows for better reusability and testability.

Athena::Validator comes with a set of common constraints built in. See the individual types within AVD::Constraints for more information.

A constraint can be instantiated and passed to a validator directly:

Constraint annotation(s) can also be applied to instance variables to assert the value of that property adheres to the constraint.

Constraints can also be added manually via code by defining an self.load_metadata(metadata : AVD::Metadata::ClassMetadata) : Nil method and adding the constraints directly to the AVD::Metadata::ClassMetadata instance.

The metadata for each type is lazily loaded when an instance of that type is validated, and is only built once.

While most constraints can be instantiated with an argless constructor,they do have a set of optional arguments. * The message argument represents the message that should be used if the value is found to not be valid. The message can also include placeholders, in the form of {{ key }}, that will be replaced when the message is rendered. Most commonly this includes the invalid value itself, but some constraints have additional placeholders. * The payload argument can be used to attach any domain specific data to the constraint; such as attaching a severity with each constraint to have more serious violations be handled differently. See the Payload section. * The groups argument can be used to run a subset of the defined constraints. More on this in the Validation Groups section.

validator = AVD.validator # Instantiate a constraint with a custom message, using a placeholder. violations = validator.validate -4, AVD::Constraints::PositiveOrZero.new message: "{{ value }} is not a valid age. A user cannot have a negative age." puts violations # => # -4: # -4 is not a valid age. A user cannot have a negative age. (code: e09e52d0-b549-4ba1-8b4e-420aad76f0de) Customizing the message can be a good way for those consuming the errors to determine WHY a given value is not valid.

The first argument of the constructor is known as the default argument. This argument is special when using the annotation based approach in that it can be supplied as a positional argument within the annotation.

For example the default argument for AVD::Constraints::GreaterThan is the value that the value being validated should be compared against.

Only the first argument can be supplied positionally, all other arguments must be provided as named arguments within the annotation.

Athena::Validator has very basic support for pluralizing constraint #messages via AVD::Violation::ConstraintViolationInterface#plural.

For example the #message could have different versions based on the plurality of the violation. Currently this only supports two contexts: singular (1/nil) and plural (2+).

Multiple messages, separated by a |, can be included as part of an AVD::Constraint message. For example from AVD::Constraints::Size:

min_message : String = "This value is too short. It should have {{ limit }} {{ type }} or more.|This value is too short. It should have {{ limit }} {{ type }}s or more."

If violations' #plural method returns 1 (or nil) the first message will be used. If #plural is 2 or more, the latter message will be used.

Support more robust translations; like language or multiple pluralities.

The payload argument defined on every AVD::Constraint type can be used to store custom domain specific information with a constraint. This data can later be retrieved off of an AVD::Violation::ConstraintViolationInterface. An example use case for this could be mapping a "severity" to a CSS class based on how important each specific constraint is.

The groups argument defined on every AVD::Constraint type can be used to run a subset of validations.

For example, say we only want to validate certain properties when the user is first created:

Using this configuration, there are three groups at play within the User class: 1. default - Contains constraints in the current type, and subtypes, that belong to no other group. I.e. city. 1. User - In this example, equivalent to all constraints in the default group. See AVD::Constraints::GroupSequence, and the note below. 1. create - A custom group that only contains the constraints explicitly associated with it. I.e. email, and password.

When validating just the User object, the default group is equivalent to the User group. However, if the User object has other embedded types using the AVD::Constraints::Valid constraint, then validating the User object with the User group would only validate constraints that are explicitly in the User group within the embedded types.

By default, all constraints are validated in a single "batch". I.e. all constraints within the provided group(s) are validated, without regard to if the previous/next constraint is/was (in)valid. However, an AVD::Constraints::GroupSequence can be used to validate batches of constraints in steps. I.e. validate the first "batch" of constraints, and only advance to the next batch if all constraints in that step are valid.

The payload is not used with the framework itself.

If the built in AVD::Constraints are not sufficient to handle validating a given value/object; custom ones can be defined. Let's make a new constraint that asserts a string contains only alphanumeric characters.

This is accomplished by first defining a new class within the AVD::Constraints namespace that inherits from AVD::Constraint. Then define a Validator struct within our constraint that inherits from AVD::ConstraintValidator that actually implements the validation logic.

The constraint MUST be defined within the AVD::Constraints namespace for implementation reasons. This may change in the future.

We are now able to use this constraint as we would one of the built in ones; either by manually instantiating it, or applying an @[Assert::AlphaNumeric] annotation to a property.

See AVD::ConstraintValidatorInterface for more information on custom validators.

The AVD::Constraints::Compound constraint can be used to create a constraint that consists of one or more other constraints.

The group that self is a part of if no other group(s) are explicitly defined.

Returns the name of the provided error_code.

Adds the provided group to #groups if self is in the AVD::Constraint::DEFAULT_GROUP.

Returns the validation groups self is a part of.

Sets the validation groups self is a part of.

Returns the message that should be rendered if self is found to be invalid.

Some subtypes do not use this and instead define multiple message properties in order to support more specific error messages.

Returns any domain specific data associated with self.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (markdown):
```markdown
# An array of constraints can also be passed.
AVD.validator.validate "", AVD::Constraints::NotBlank.new
```

Example 2 (python):
```python
class Example
  include AVD::Validatable

  def initialize(@name : String); end

  # More than one constraint can be applied to a property.
  @[Assert::NotBlank]
  property name : String
end

# Constraints are extracted from the annotations.
# An array can also be passed to validate against that list instead.
AVD.validator.validate Example.new("Jim")
```

Example 3 (swift):
```swift
# This class method is invoked when building the metadata associated with a type,
# and can be used to manually wire up the constraints.
def self.load_metadata(metadata : AVD::Metadata::ClassMetadata) : Nil
  metadata.add_property_constraint "name", AVD::Constraints::NotBlank.new
end
```

Example 4 (julia):
```julia
validator = AVD.validator

# Instantiate a constraint with a custom message, using a placeholder.
violations = validator.validate -4, AVD::Constraints::PositiveOrZero.new message: "{{ value }} is not a valid age.  A user cannot have a negative age."

puts violations # =>
# -4:
#   -4 is not a valid age.  A user cannot have a negative age. (code: e09e52d0-b549-4ba1-8b4e-420aad76f0de)
```

---

## struct Athena::Console::Completion::Suggestions::SuggestedValue inherits Struct #

**URL:** https://athenaframework.org/Console/Completion/Suggestions/SuggestedValue/

**Contents:**
- struct Athena::Console::Completion::Suggestions::SuggestedValue inherits Struct #
- Constructors#
  - .new(value : String, description : String = "")#
- Methods#
  - #clone#
  - #copy_with(value _value = @value, description _description = @description)#
  - #description : String#
  - #to_s(io : IO) : Nil#
  - #value : String#

Represents a single suggested values, plus optional description.

Same as #inspect(io).

---

## class Athena::Validator::Constraints::NotEqualTo(ValueType) inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/NotEqualTo/

**Contents:**
- class Athena::Validator::Constraints::NotEqualTo(ValueType) inherits Athena::Validator::Constraint #
- Configuration#
  - Required Arguments#
    - value#
  - Optional Arguments#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Included modules

Validates that a value is not equal to another.

Defines the value that the value being validated should be compared to.

Type: String Default: This value should not be equal to {{ compared_value }}.

The message that will be shown if the value is equal to the comparison value.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::Constraint#message for this constraint.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class User
  include AVD::Validatable

  def initialize(@name : String); end

  @[Assert::NotEqualTo("John Doe")]
  property name : String
end
```

---

## class Athena::Console::Output::Section inherits Athena::Console::Output::IO #

**URL:** https://athenaframework.org/Console/Output/Section/

**Contents:**
- class Athena::Console::Output::Section inherits Athena::Console::Output::IO #
- Constructors#
  - .new(io : ::IO, sections : Array(self), verbosity : ACON::Output::Verbosity, decorated : Bool, formatter : ACON::Formatter::Interface)#
- Methods#
  - #clear(lines : Int32 | Nil = nil) : Nil#
  - #content : String#
  - #max_height=(max_height : Int32 | Nil) : Nil#
  - #overwrite(message : String | Enumerable(String)) : Nil#
  - #overwrite(*messages : String) : Nil#

A ACON::Output::ConsoleOutput can be divided into multiple sections that can be written to and cleared independently of one another.

Output sections can be used for advanced console outputs, such as displaying multiple progress bars which are updated independently, or appending additional rows to tables.

Clears at most lines from self. If lines is nil, all of self is cleared.

Returns the full content string contained within self.

Overrides the current content of self with the provided message.

Overrides the current content of self with the provided messages.

**Examples:**

Example 1 (julia):
```julia
protected def execute(input : ACON::Input::Interface, output : ACON::Output::Interface) : ACON::Command::Status
  raise ArgumentError.new "This command may only be used with `ACON::Output::ConsoleOutputInterface`." unless output.is_a? ACON::Output::ConsoleOutputInterface

  section1 = output.section
  section2 = output.section

  section1.puts "Hello"
  section2.puts "World!"
  # Output contains "Hello\nWorld!\n"

  sleep 1.second

  # Replace "Hello" with "Goodbye!"
  section1.overwrite "Goodbye!"
  # Output now contains "Goodbye\nWorld!\n"

  sleep 1.second

  # Clear "World!"
  section2.clear
  # Output now contains "Goodbye!\n"

  sleep 1.second

  # Delete the last 2 lines of the first section
  section1.clear 2
  # Output is now empty

  ACON::Command::Status::SUCCESS
end
```

---

## module Athena::Validator::ConstraintValidatorInterface #

**URL:** https://athenaframework.org/Validator/ConstraintValidatorInterface/

**Contents:**
- module Athena::Validator::ConstraintValidatorInterface #
    - Example#
- Direct including types
- Methods#
  - abstract #context : AVD::ExecutionContextInterface#
  - abstract #validate(value : _, constraint : AVD::Constraint) : Nil#

A constraint validator is responsible for implementing the actual validation logic for a given AVD::Constraint.

Constraint validators should inherit from this type and implement a #validate method. Most commonly the validator type will be defined within the namespace of the related AVD::Constraint itself.

The #validate method itself does not return anything. Violations are added to the current #context, either as a single error message, or augmented with additional metadata about the failure. See AVD::ExecutionContextInterface for more information on how violations can be added.

Overloads of the #validate method can also be used to handle validating values of different types independently. If the value cannot be handled by any of self's validators, it is handled via AVD::ConstraintValidator#validate and is essentially a noop.

If a AVD::Constraint can only support values of certain types, AVD::ConstraintValidator#raise_invalid_type in a catchall overload can be used to add an invalid type AVD::Violation::ConstraintViolationInterface.

Normally custom validators should not handle nil or blank values as they are handled via other constraints.

Returns the a reference to the AVD::ExecutionContextInterface to which violations within self should be added.

See the type for more information.

Validate the provided value against the provided constraint.

Violations should be added to the current #context.

**Examples:**

Example 1 (python):
```python
class AVD::Constraints::MyConstraint < AVD::Constraint
  # Initializer/etc for the constraint

  class Validator < AVD::ConstraintValidator
    # Define a validate method that handles values of any type, and our `MyConstraint` constraint.
    def validate(value : _, constraint : AVD::Constraints::MyConstraint) : Nil
      # Implement logic to determine if the value is valid.
      # Violations should be added to the current `#context`,
      # See `AVD::ExecutionContextInterface` for more information.
    end
  end
end
```

Example 2 (swift):
```swift
class Validator < AVD::ConstraintValidator
  def validate(value : Number, constraint : AVD::Constraints::MyConstraint) : Nil
    # Handle validating `Number` values
  end

  def validate(value : Time, constraint : AVD::Constraints::MyConstraint) : Nil
    # Handle validating `Time` values
  end

  def validate(value : _, constraint : AVD::Constraints::MyConstraint) : Nil
    # Add an invalid type violation for values of all other types.
    self.raise_invalid_type value, "Number | Time"
  end
end
```

---

## Introduction

**URL:** https://athenaframework.org/EventDispatcher/

**Contents:**
- Introduction
- Installation#
- Usage#
- Learn More#

Object-oriented code has helped a lot in ensuring code extensibility. By having classes with well defined responsibilities, it becomes more flexible and easily extendable to modify their behavior. However inheritance has its limits is not the best option when these modifications need to be shared between other modified subclasses. Say for example you want to do something before and after a method is executed, without interfering with the other logic.

The Athena::EventDispatcher component is a Mediator and Observer pattern event library. This pattern allows creating very flexibly and truly extensible applications.

A good example of this is the architecture of the Athena Framework itself in how it uses Athena::EventDispatcher to dispatch events that then is able to notify all registered listeners for that event. These listeners could then make any necessary modifications seamlessly without affecting the framework logic itself, or the other listeners.

First, install the component by adding the following to your shard.yml, then running shards install:

Usage of this component centers around AED::EventDispatcherInterface, an extension of the base ACTR::EventDispatcher::Interface with extra functionality, with the default implementation being AED::EventDispatcher. The event dispatcher keeps track of the listeners on various AED::Events. An event is nothing more than a plain old Crystal object that provides access to data related to the event.

For simple use cases, listeners may be registered directly:

However having a dedicated type is usually the better practice.

In either case, the dispatcher can then be used to dispatch our event.

If using this component within the context of something that handles independent execution flows, such as a web framework, you will want there to be a dedicated dispatcher instance for each path. This ensures that one flow will not leak state to any other flow, while still allowing flow specific mutations to be used. Consider pairing this component with the Athena::DependencyInjection component as a way to handle this.

**Examples:**

Example 1 (yaml):
```yaml
dependencies:
  athena-event_dispatcher:
    github: athena-framework/event-dispatcher
    version: ~> 0.4.0
```

Example 2 (python):
```python
# Create a custom event that can be emitted when an order is placed.
class OrderPlaced < AED::Event
  getter order : Order

  def initialize(@order : Order); end
end
```

Example 3 (julia):
```julia
dispatcher = AED::EventDispatcher.new

# Register a listener on our event directly with the dispatcher
dispatcher.listener OrderPlaced do |event|
  pp event.order
end
```

Example 4 (julia):
```julia
struct SendConfirmationListener
  @[AEDA::AsEventListener]
  def order_placed(event : OrderPlaced) : Nil
    # Send a confirmation email to the user
  end
end

dispatcher.listener SendConfirmationListener.new
```

---

## module Athena::MIME::Header::Interface #

**URL:** https://athenaframework.org/MIME/Header/Interface/

**Contents:**
- module Athena::MIME::Header::Interface #
- Direct including types
- Methods#
  - #body#
  - #body=(body)#
  - #body_to_s : String#
  - abstract #max_line_length : Int32#
  - abstract #max_line_length=(max_line_length : Int32)#
  - abstract #name : String#
  - abstract #to_s(io : IO) : Nil#

An OO representation of a MIME header.

Returns the body of the header. The type depends on the specific concrete class.

Sets the body of the header. The type depends on the specific concrete class.

Returns the header's body, prepared for folding into a final header value.

This is not necessarily RFC 2822 compliant since folding white space is not added at this stage (see #to_s for that).

Controls how long each header line may be before needing wrapped. Defaults to 76.

Controls how long each header line may be before needing wrapped. Defaults to 76.

Returns the name of the header.

Render this header as a compliant string.

---

## module Athena::Console::Spec::Tester #

**URL:** https://athenaframework.org/Console/Spec/Tester/

**Contents:**
- module Athena::Console::Spec::Tester #
- Direct including types
- Methods#
  - #assert_command_is_not_successful(message : String = "", *, file : String = __FILE__, line : Int32 = __LINE__) : Nil#
  - #assert_command_is_successful(message : String = "", *, file : String = __FILE__, line : Int32 = __LINE__) : Nil#
  - #display(normalize : Bool = false) : String#
  - #error_output(normalize : Bool = false) : String#
  - #inputs(*args : String) : Nil#
  - #inputs=(inputs : Array(String))#
  - #output : ACON::Output::Interface#

Contains common logic shared by both ACON::Spec::CommandTester and ACON::Spec::ApplicationTester.

Asserts that the return #status is NOT successful.

Asserts that the return #status is successful.

Returns the output resulting from running the command. Raises if called before executing the command.

Returns the error output resulting from running the command. Raises if capture_stderr_separately was not set to true.

Helper method to setting the #inputs= property.

Sets an array of values that will be used as the input to the command. RETURN is automatically assumed after each input.

Returns the ACON::Output::Interface being used by the tester.

Returns the ACON::Output::Interface being used by the tester.

---

## class Athena::Framework::Events::Terminate inherits Athena::EventDispatcher::Event #

**URL:** https://athenaframework.org/Framework/Events/Terminate/

**Contents:**
- class Athena::Framework::Events::Terminate inherits Athena::EventDispatcher::Event #
- Included modules
- Constructors#
  - .new(request : ATH::Request, response : ATH::Response)#
- Methods#
  - #response : ATH::Response#

Emitted very late in the request's life-cycle, after the response has been sent.

This event can be listened on to perform tasks that are not required to finish before the response is sent; such as sending emails, or other "heavy" tasks.

See the Getting Started docs for more information.

---

## struct Athena::Console::Formatter::OutputStyle inherits Struct #

**URL:** https://athenaframework.org/Console/Formatter/OutputStyle/

**Contents:**
- struct Athena::Console::Formatter::OutputStyle inherits Struct #
- Included modules
- Constructors#
  - .new(foreground : Colorize::Color | String = :default, background : Colorize::Color | String = :default, options : Colorize::Mode = :none)#
- Methods#
  - #add_option(option : Colorize::Mode) : Nil#
  - #add_option(option : String) : Nil#
  - #apply(text : String) : String#
  - #background=(background : Colorize::Color)#
  - #background=(color : String)#

Default implementation of ACON::Formatter::OutputStyleInterface.

Adds a text mode to self.

Applies self to the provided text.

Sets the background color of self.

Sets the foreground color of self.

Sets the href that self should link to.

Removes a text mode to self.

---

## class Athena::MIME::Header::Date inherits Athena::MIME::Header::Abstract #

**URL:** https://athenaframework.org/MIME/Header/Date/

**Contents:**
- class Athena::MIME::Header::Date inherits Athena::MIME::Header::Abstract #
- Constructors#
  - .new(name : String, value : Time)#
- Methods#
  - #body : Time#
  - #body=(body : Time)#

Represents a date MIME Header.

Returns the body of this header.

Sets the body of this header.

---

## class Athena::MIME::Exception::Logic inherits Exception #

**URL:** https://athenaframework.org/MIME/Exception/Logic/

**Contents:**
- class Athena::MIME::Exception::Logic inherits Exception #
- Included modules

Represents a code logic error that should lead directly to a fix in your code.

---

## alias Athena::Console::Helper::ProgressIndicator::PlaceholderFormatter #

**URL:** https://athenaframework.org/Console/Helper/ProgressIndicator/PlaceholderFormatter/

**Contents:**
- alias Athena::Console::Helper::ProgressIndicator::PlaceholderFormatter #
- Alias definition

Represents the expected type of a Placeholder Formatter.

---

## enum Athena::Framework::Request::ProxyHeader #

**URL:** https://athenaframework.org/Framework/Request/ProxyHeader/

**Contents:**
- enum Athena::Framework::Request::ProxyHeader #
- Members#
  - FORWARDED = 1#
  - FORWARDED_FOR = 2#
  - FORWARDED_HOST = 4#
  - FORWARDED_PROTO = 8#
  - FORWARDED_PORT = 16#
  - None = 0#
  - All = 31#
- Methods#

Represents the supported Proxy Headers. Can be used via ATH::Request.set_trusted_proxies to whitelist which headers are allowed.

See the external documentation for more information.

The forwarded header as defined by RFC 7239.

The x-forwarded-for header.

The x-forwarded-host header.

The x-forwarded-proto header.

Similar to FORWARDED_HOST, but exclusive to the port number.

Returns true if this enum value contains FORWARDED

Returns true if this enum value contains FORWARDED_FOR

Returns true if this enum value contains FORWARDED_HOST

Returns the forwarded param related to a given proxy header.

Returns true if this enum value contains FORWARDED_PORT

Returns true if this enum value contains FORWARDED_PROTO

Returns the string header name for a given proxy header.

**Examples:**

Example 1 (yaml):
```yaml
ATH::Request::ProxyHeader::FORWARDED_PROTO.forwarded_param => "proto"
```

Example 2 (yaml):
```yaml
ATH::Request::ProxyHeader::FORWARDED_PROTO.header => "x-forwarded-proto"
```

---

## annotation Athena::Serializer::Annotations::Expose #

**URL:** https://athenaframework.org/Serializer/Annotations/Expose/

**Contents:**
- annotation Athena::Serializer::Annotations::Expose #
  - Example#

Indicates that a property should be serialized/deserialized when used with :all ASRA::ExclusionPolicy.

Also see, ASRA::IgnoreOnDeserialize and ASRA::IgnoreOnSerialize.

On deserialization, the excluded properties must be nilable, or have a default value.

**Examples:**

Example 1 (json):
```json
@[ASRA::ExclusionPolicy(:all)]
class Example
  include ASR::Serializable

  def initialize; end

  @[ASRA::Expose]
  property name : String = "Jim"

  property password : String = "monkey"
end

ASR.serializer.serialize Example.new, :json                                          # => {"name":"Jim"}
ASR.serializer.deserialize Example, %({"name":"Jim","password":"password1!"}), :json # => #<Example:0x7f6eec4b6a60 @name="Jim", @password="monkey">
```

---

## class Athena::EventDispatcher::GenericEvent(S, V) inherits Athena::EventDispatcher::Event #

**URL:** https://athenaframework.org/EventDispatcher/GenericEvent/

**Contents:**
- class Athena::EventDispatcher::GenericEvent(S, V) inherits Athena::EventDispatcher::Event #
  - Usage#
- Constructors#
  - .new(subject : S, arguments : Hash(String, V))#
  - .new(subject : S)#
- Methods#
  - #[](key : String) : V#
  - #[]=(key : String, value : V) : Nil#
  - #[]?(key : String) : V | Nil#
  - #arguments : Hash(String, V)#

An extension of AED::Event that provides a generic event type that can be used in place of dedicated event types. Allows using various instantiations of this one event type to handle multiple events.

This type is provided for convenience for use within simple use cases. Dedicated event types are still considered a best practice.

A generic event consists of a #subject of type S, which is some object/value representing an event that has occurred. #arguments of type V may also be provided to augment the event with additional context, which is modeled as a Hash(String, V).

Refer to AED::Event for examples of how listeners on events with generics behave.

Make this include Mappable when/if https://github.com/crystal-lang/crystal/issues/10886 is implemented.

Returns the argument with the provided key, raising if it does not exist.

Sets the argument with the provided key to the provided value.

Returns the argument with the provided key, or nil if it does not exist.

Returns the extra information stored with this event.

Sets the extra information that should be stored with this event.

Returns true if there is an argument with the provided key, otherwise false.

Returns the subject of this event.

**Examples:**

Example 1 (json):
```json
dispatcher.dispatch(
  AED::GenericEvent(MyClass, Int32 | String).new(
    my_class_instance,
    {"counter" => 0, "data" => "bar"}
  )
)
```

---

## struct Athena::Framework::Controller::ArgumentResolver inherits Struct #

**URL:** https://athenaframework.org/Framework/Controller/ArgumentResolver/

**Contents:**
- struct Athena::Framework::Controller::ArgumentResolver inherits Struct #
- Included modules
- Constructors#
  - .new(value_resolvers : Array(Athena::Framework::Controller::ValueResolvers::Interface))#
- Methods#
  - #get_arguments(request : ATH::Request, route : ATH::ActionBase) : Array#

The default implementation of ATH::Controller::ArgumentResolverInterface.

Returns an array of arguments resolved from the provided request for the given route.

---

## module Athena::Console::Style::Interface #

**URL:** https://athenaframework.org/Console/Style/Interface/

**Contents:**
- module Athena::Console::Style::Interface #
  - Custom Styles#
- Direct including types
- Methods#
  - abstract #ask(question : String, default : _)#
  - abstract #ask_hidden(question : String)#
  - abstract #caution(messages : String | Enumerable(String)) : Nil#
  - abstract #choice(question : String, choices : Indexable | Hash, default = nil)#
  - abstract #comment(messages : String | Enumerable(String)) : Nil#
  - abstract #confirm(question : String, default : Bool = true) : Bool#

Represents a "style" that provides a way to abstract how to format console input/output data such that you can reduce the amount of code needed, and to standardize the appearance.

See ACON::Style::Athena.

Custom styles can also be created by implementing this interface, and optionally extending from ACON::Style::Output which makes the style an ACON::Output::Interface as well as defining part of this interface. Then you could simply instantiate your custom style within a command as you would ACON::Style::Athena.

Helper method for asking ACON::Question questions.

Helper method for asking hidden ACON::Question questions.

Formats and prints the provided messages within a caution block.

Helper method for asking ACON::Question::Choice questions.

Formats and prints the provided messages within a comment block.

Helper method for asking ACON::Question::Confirmation questions.

Formats and prints the provided messages within a error block.

Formats and prints the provided messages within a info block.

Formats and prints a bulleted list containing the provided elements.

Prints count empty new lines.

Formats and prints the provided messages within a note block.

Advances the internal ACON::Helper::ProgressBar by the provided amount of steps.

Completes the internal ACON::Helper::ProgressBar.

Starts an internal ACON::Helper::ProgressBar, optionally with the provided max amount of steps.

Creates a section header with the provided message.

Formats and prints the provided messages within a success block.

Formats and prints a table based on the provided headers and rows, followed by a new line.

Formats and prints the provided messages as text.

Formats and prints message as a title.

Formats and prints the provided messages within a warning block.

---

## abstract class Athena::Framework::Spec::AbstractBrowser inherits Reference #

**URL:** https://athenaframework.org/Framework/Spec/AbstractBrowser/

**Contents:**
- abstract class Athena::Framework::Spec::AbstractBrowser inherits Reference #
- Direct known subclasses
- Methods#
  - #request(method : String, path : String, headers : HTTP::Headers, body : String | Bytes | IO | Nil) : HTTP::Server::Response#
  - #request(request : ATH::Request | HTTP::Request) : HTTP::Server::Response#
  - #request : ATH::Request#
  - #response : HTTP::Server::Response#

Simulates a browser to make requests to some destination.

Currently just acts as a client to make HTTP requests. This type exists to allow for introduction of other functionality in the future.

Makes an HTTP request with the provided method, at the provided path, with the provided body and/or headers and returns the resulting response.

Makes an HTTP request with the provided request, returning the resulting response.

---

## enum Athena::Console::Completion::Input::Type #

**URL:** https://athenaframework.org/Console/Completion/Input/Type/

**Contents:**
- enum Athena::Console::Completion::Input::Type #
- Members#
  - NONE = 0#
  - ARGUMENT_VALUE = 1#
  - OPTION_VALUE = 2#
  - OPTION_NAME = 3#
- Methods#
  - #argument_value?#
  - #none?#
  - #option_name?#

Nothing should be completed.

Completing the value of an argument.

Completing the value of an option.

Completing the name of an option.

Returns true if this enum value equals ARGUMENT_VALUE

Returns true if this enum value equals NONE

Returns true if this enum value equals OPTION_NAME

Returns true if this enum value equals OPTION_VALUE

---

## class Athena::Clock::Spec::MockClock inherits Reference #

**URL:** https://athenaframework.org/Clock/Spec/MockClock/

**Contents:**
- class Athena::Clock::Spec::MockClock inherits Reference #
- Included modules
- Constructors#
  - .new(now : Time = Time.local, location : Time::Location | Nil = nil)#
- Methods#
  - #in_location(location : Time::Location) : self#
  - #now : Time#
  - #shift(*, years : Int = 0, months : Int = 0, weeks : Int = 0, days : Int = 0, hours : Int = 0, minutes : Int = 0, seconds : Int = 0) : Nil#
  - #sleep(span : Time::Span) : Nil#

The mock clock is instantiated with a time and does not move forward on its own. The time is fixed until #sleep or #shift is called. This provides full control over what time the code assumes it's running with, ultimately making testing time-sensitive types much easier.

Returns a new clock instance set to the provided location.

Returns the current time as determined by the clock.

Shifts the mocked time instance by the provided amount of time. Positive values shift into the future, while negative values shift into the past.

This method is essentially equivalent to calling #sleep with the same amount of time, but this method provides a better API in some cases.

Sleeps for the provided span of time.

**Examples:**

Example 1 (python):
```python
class ExpirationChecker
  def initialize(@clock : Athena::Clock::Interface); end

  def expired?(valid_until : Time) : Bool
    @clock.now > valid_until
  end
end

clock = ACLK::Spec::MockClock.new Time.utc 2023, 9, 16, 15, 20
expiration_checker = ExpirationChecker.new clock
valid_until = Time.utc 2023, 9, 16, 15, 25

# valid_until is in the future, so not expired
expiration_checker.expired?(valid_until).should be_false

# Sleep for 10 minutes, so time is now 2023-09-16 15:30:00,
# time is instantly changes as if 10 minutes really passed
clock.sleep 10.minutes

expiration_checker.expired?(valid_until).should be_true

# Time can also be shifted, either into the future or past
clock.shift minutes: -20

# valid_until is in the future again, so not expired
expiration_checker.expired?(valid_until).should be_false
```

---

## struct Athena::Framework::ParameterBag inherits Struct #

**URL:** https://athenaframework.org/Framework/ParameterBag/

**Contents:**
- struct Athena::Framework::ParameterBag inherits Struct #
    - Example#
- Constructors#
  - .new#
- Methods#
  - #get(name : String, _type : Bool.class) : Bool#
  - #get(name : String, _type : String.class) : String#
  - #get(name : String, _type : Float32.class) : Float32#
  - #get(name : String, _type : Float64.class) : Float64#
  - #get(name : String, _type : Int128.class) : Int128#

A container for storing key/value pairs. Can be used to store arbitrary data within the context of a request. It can be accessed via ATH::Request#attributes.

For example, an artbirary value can be stored in the attributes, and later provided as an action argument.

Returns the value of the parameter with the provided name as a Bool.

Returns the value of the parameter with the provided name as a String.

Returns the value of the parameter with the provided name as a Float32.

Returns the value of the parameter with the provided name as a Float64.

Returns the value of the parameter with the provided name as a Int128.

Returns the value of the parameter with the provided name as a Int16.

Returns the value of the parameter with the provided name as a Int32.

Returns the value of the parameter with the provided name as a Int64.

Returns the value of the parameter with the provided name as a Int8.

Returns the value of the parameter with the provided name as a UInt128.

Returns the value of the parameter with the provided name as a UInt16.

Returns the value of the parameter with the provided name as a UInt32.

Returns the value of the parameter with the provided name as a UInt64.

Returns the value of the parameter with the provided name as a UInt8.

Returns the value of the parameter with the provided name, casted to the provided type.

Raises a KeyError if no parameter with that name exists.

Returns the value of the parameter with the provided name.

Raises a KeyError if no parameter with that name exists.

Returns the value of the parameter with the provided name as a Bool, or nil if it does not exist.

Returns the value of the parameter with the provided name as a String, or nil if it does not exist.

Returns the value of the parameter with the provided name as a Float32, or nil if it does not exist.

Returns the value of the parameter with the provided name as a Float64, or nil if it does not exist.

Returns the value of the parameter with the provided name as a Int128, or nil if it does not exist.

Returns the value of the parameter with the provided name as a Int16, or nil if it does not exist.

Returns the value of the parameter with the provided name as a Int32, or nil if it does not exist.

Returns the value of the parameter with the provided name as a Int64, or nil if it does not exist.

Returns the value of the parameter with the provided name as a Int8, or nil if it does not exist.

Returns the value of the parameter with the provided name as a UInt128, or nil if it does not exist.

Returns the value of the parameter with the provided name as a UInt16, or nil if it does not exist.

Returns the value of the parameter with the provided name as a UInt32, or nil if it does not exist.

Returns the value of the parameter with the provided name as a UInt64, or nil if it does not exist.

Returns the value of the parameter with the provided name as a UInt8, or nil if it does not exist.

Returns the value of the parameter with the provided name casted to the provided type if it exists, otherwise nil.

Returns the value of the parameter with the provided name if it exists, otherwise nil.

Returns true if a parameter with the provided name exists and is of the provided type, otherwise false.

Returns true if a parameter with the provided name exists, otherwise false.

Removes the parameter with the provided name.

Sets a parameter with the provided name to value, restricted to the given type.

Sets a parameter with the provided name to value.

**Examples:**

Example 1 (julia):
```julia
require "athena"

# Define a request listener to add our value before the action is executed.
@[ADI::Register]
struct TestListener
  @[AEDA::AsEventListener]
  def on_request(event : ATH::Events::Request) : Nil
    # Store our value within the request's attributes, restricted to a `String`.
    event.request.attributes.set "my_arg", "foo", String
  end
end

class ExampleController < ATH::Controller
  # Define an action parameter with the same name of the parameter stored in attributes.
  #
  # The argument to pass is resolved via `ATHR::RequestAttribute`.
  get "/", my_arg : String do
    my_arg
  end
end

ATH.run

# GET / # => "foo"
```

---

## class Athena::Console::Helper::Table inherits Reference #

**URL:** https://athenaframework.org/Console/Helper/Table/

**Contents:**
- class Athena::Console::Helper::Table inherits Reference #
- Usage#
  - Separating Rows#
  - Header/Footer Titles#
  - Column Sizing#
    - Max Width#
  - Orientation#
  - Styles#
    - borderless#
    - compact#

The Table helper can be used to display tabular data rendered to any ACON::Output::Interface.

Most commonly, a table will consist of a header row followed by one or more data rows: @[ACONA::AsCommand("table")] class TableCommand < ACON::Command protected def execute(input : ACON::Input::Interface, output : ACON::Output::Interface) : ACON::Command::Status ACON::Helper::Table.new(output) .headers("ISBN", "Title", "Author") .rows([ ["99921-58-10-7", "Divine Comedy", "Dante Alighieri"], ["9971-5-0210-0", "A Tale of Two Cities", "Charles Dickens"], ["960-425-059-0", "The Lord of the Rings", "J. R. R. Tolkien"], ["80-902734-1-6", "And Then There Were None", "Agatha Christie"], ]) .render ACON::Command::Status::SUCCESS end end

Row separators can be added anywhere in the output by passing an ACON::Helper::Table::Separator as a row.

Header and/or footer titles can optionally be added via the #header_title and/or #footer_title methods.

By default, the width of each column is calculated automatically based on their contents. The #column_widths method can be used to set the column widths explicitly.

In this example, the first column's width will be 10, the last column's width will be 30, and the second column's width will be calculated automatically since it is zero. If you only want to set the width of a specific column, the #column_width method can be used.

The resulting table would be:

Notice that the width of the first column is greater than 10 characters wide. This is because column widths are always considered as the minimum width. If the content doesn't fit, it will be automatically increased to the longest content length.

If you would rather wrap the contents in multiple rows, the #column_max_width method can be used.

This would cause the table to now be:

By default, the table contents are displayed as a normal table with the data being in rows, the first being the header row(s). The table can also be rendered vertically or horizontally via the #vertical and #horizontal methods respectively.

For example, the same contents rendered vertically would be:

While horizontally, it would be:

Up until now, all the tables have been rendered using the default style. The table helper comes with a few additional built in styles, including:

The desired can be set via the #style method.

If you would rather something more personal, custom styles can also be defined by providing #style with an ACON::Helper::Table::Style instance.

Notice you can use the same style tags as you can with ACON::Formatter::OutputStyleInterfaces. This is used by default to give some color to headers when allowed.

Custom styles can also be registered globally: ACON::Helper::Table.set_style_definition "colorful", table_style # ... table.style("colorful") This method can also be used to override the built-in styles.

See ACON::Helper::Table::Style for more information.

The ACON::Helper::Table::Cell type can be used to style a specific cell. Such as customizing the fore/background color, the alignment of the text, or the overall format of the cell.

See the related type for more information/examples.

The ACON::Helper::Table::Cell type can also be used to add colspan and/or rowspan to a cell; which would make it span more than one column/row.

This would result in:

This table cells with colspan and center alignment can be used to create header cells that span the entire table width: table .headers([ [ACON::Helper::Table::Cell.new( "Main table title", colspan: 3, style: ACON::Helper::Table::CellStyle.new( align: :center ) )], %w(ISBN Title Author), ]) Would generate: +--------+--------+--------+ | Main table title | +--------+--------+--------+ | ISBN | Title | Author | +--------+--------+--------+

In a similar way, rowspan can be used to have a column span multiple rows. This is especially helpful for columns with line breaks.

This would result in:

colspan and rowspan may also be used together to create any layout you can think of.

The #render method requires providing the entire table's content in order to fully render the table. In some cases, that may not be possible if the data is generated dynamically. In such cases, the #append_row method can be used which functions similarly to #add_row, but will append the rows to an already rendered table.

This feature is only available when the table is rendered in an ACON::Output::Section.

This ultimately results in:

Registers the provided style with the provided name.

Returns the ACON::Helper::Table::Style style with the provided name, raising an ACON::Exception::InvalidArgument if no style with that name is defined.

Adds a single new row to this table.

Adds the provided columns as a single row to this table.

Similar to #rows(rows : Enumerable(RowType)), but appends the provided rows to this table.

Appends row to an already rendered table.

See modifying rendered tables

Appends the provided columns as a single row to an already rendered table.

See modifying rendered tables

Sets the maximum width for the column at the provided index.

Sets the style of the column at the provided index. style may either be an explicit ACON::Helper::Table::Style, or the name of the style to use if it is built-in, or was registered via .set_style_definition.

Returns the ACON::Helper::Table::Style the column at the provided index is using, falling back on #style.

Sets the minimum width for the column at the provided index.

Sets the minimum column widths to the provided widths.

Sets the minimum column widths to the provided widths.

Sets the table footer title.

Sets the table header title.

Changes this table's orientation to horizontal.

Renders this table to the ACON::Output::Interface it was instantiated with.

ameba:disable Metrics/CyclomaticComplexity

Manually sets the provided row to the provided index.

Overrides the rows of this table to those provided in rows.

Overrides the rows of this table to those provided in rows.

Sets the style of this table. style may either be an explicit ACON::Helper::Table::Style, or the name of the style to use if it is built-in, or was registered via .set_style_definition.

See styles and custom styles.

Returns the ACON::Helper::Table::Style used by this table.

Changes this table's orientation to vertical.

**Examples:**

Example 1 (rust):
```rust
+---------------+--------------------------+------------------+
| ISBN          | Title                    | Author           |
+---------------+--------------------------+------------------+
| 99921-58-10-7 | Divine Comedy            | Dante Alighieri  |
| 9971-5-0210-0 | A Tale of Two Cities     | Charles Dickens  |
| 960-425-059-0 | The Lord of the Rings    | J. R. R. Tolkien |
| 80-902734-1-6 | And Then There Were None | Agatha Christie  |
+---------------+--------------------------+------------------+
```

Example 2 (php):
```php
@[ACONA::AsCommand("table")]
class TableCommand < ACON::Command
  protected def execute(input : ACON::Input::Interface, output : ACON::Output::Interface) : ACON::Command::Status
    ACON::Helper::Table.new(output)
      .headers("ISBN", "Title", "Author")
      .rows([
        ["99921-58-10-7", "Divine Comedy", "Dante Alighieri"],
        ["9971-5-0210-0", "A Tale of Two Cities", "Charles Dickens"],
        ["960-425-059-0", "The Lord of the Rings", "J. R. R. Tolkien"],
        ["80-902734-1-6", "And Then There Were None", "Agatha Christie"],
      ])
      .render

    ACON::Command::Status::SUCCESS
  end
end
```

Example 3 (json):
```json
table
  .rows([
    ["99921-58-10-7", "Divine Comedy", "Dante Alighieri"],
    ["9971-5-0210-0", "A Tale of Two Cities", "Charles Dickens"],
    ACON::Helper::Table::Separator.new,
    ["960-425-059-0", "The Lord of the Rings", "J. R. R. Tolkien"],
    ["80-902734-1-6", "And Then There Were None", "Agatha Christie"],
  ])
```

Example 4 (rust):
```rust
+---------------+--------------------------+------------------+
| ISBN          | Title                    | Author           |
+---------------+--------------------------+------------------+
| 99921-58-10-7 | Divine Comedy            | Dante Alighieri  |
| 9971-5-0210-0 | A Tale of Two Cities     | Charles Dickens  |
+---------------+--------------------------+------------------+
| 960-425-059-0 | The Lord of the Rings    | J. R. R. Tolkien |
| 80-902734-1-6 | And Then There Were None | Agatha Christie  |
+---------------+--------------------------+------------------+
```

---

## Aliases

**URL:** https://athenaframework.org/Framework/aliases/

**Contents:**
- Aliases
- alias ATH #
  - Alias definition
- alias ATHA #
  - Alias definition
- alias ATHR #
  - Alias definition

Convenience alias to make referencing Athena::Framework types easier.

Convenience alias to make referencing Athena::Framework::Annotations types easier.

Convenience alias to make referencing ATH::Controller::ValueResolvers types easier.

---

## module Athena::DependencyInjection::Extension::Schema #

**URL:** https://athenaframework.org/DependencyInjection/Extension/Schema/

**Contents:**
- module Athena::DependencyInjection::Extension::Schema #
  - Member Markup#
- Macros#
  - array_of(name, *members)#
  - array_of?(name, *members)#
  - object_of(name, *members)#
  - object_of?(name, *members)#
  - property(declaration)#

Used to denote a module as an extension schema. Defines the configuration properties exposed to compile passes added via ADI.add_compiler_pass. Schemas must be registered via ADI.register_extension.

This feature is intended for internal/advanced use and, for now, comes with limited public documentation.

#object_of and #array_of support a special doc comment markup that can be used to better document each member of the objects. The markup consists of --- to denote the start and end of the block. >> denotes the start of the docs for a specific property. The name of the property followed by a : should directly follow. From there, any text will be attributed to that property, until the next >> or ---. Not all properties need to be included.

The custom markup is only supported when using mkdocs with some custom templates.

Similar to #object_of, but defines an array of objects. module Schema include ADI::Extension::Schema array_of rules, path : String, value : String end ADI.register_extension "test", Schema ADI.configure({ test: { rules: [ {path: "/foo", value: "foo"}, {path: "/bar", value: "bar"}, ], }, })

If not provided, the property defaults to an empty array.

Same as #array_of but makes the default value of the property nil.

Defines a required strictly typed NamedTupleLiteral object with the provided name and members. The members consist of a variadic list of declarations, with optional default values. module Schema include ADI::Extension::Schema object_of connection, username : String, password : String, hostname : String = "localhost", port : Int32 = 5432 end ADI.register_extension "test", Schema ADI.configure({ test: { connection: {username: "admin", password: "abc123"}, }, })

This macro is preferred over a direct NamedTuple type as it allows default values to be defined, and for the members to be documented via the special Member Markup

Same as #object_of but makes the object optional, defaulting to nil.

Defines a schema property via the provided declaration. The type may be any primitive Crystal type (String, Bool, Array, Hash, Enum, Number, etc).

**Examples:**

Example 1 (julia):
```julia
module Schema
  include ADI::Extension::Schema

  # Represents a connection to the database.
  #
  # ---
  # >>username: The username, should be set to `admin` for elevated privileges.
  # >>port: Defaults to the default PG port.
  # ---
  object_of? connection, username : String, password : String, port : Int32 = 5432
end
```

Example 2 (julia):
```julia
module Schema
  include ADI::Extension::Schema

  array_of rules,
    path : String,
    value : String
end

ADI.register_extension "test", Schema

ADI.configure({
  test: {
    rules: [
      {path: "/foo", value: "foo"},
      {path: "/bar", value: "bar"},
    ],
  },
})
```

Example 3 (julia):
```julia
module Schema
  include ADI::Extension::Schema

  object_of connection,
    username : String,
    password : String,
    hostname : String = "localhost",
    port : Int32 = 5432
end

ADI.register_extension "test", Schema

ADI.configure({
  test: {
    connection: {username: "admin", password: "abc123"},
  },
})
```

Example 4 (julia):
```julia
module Schema
  include ADI::Extension::Schema

  property enabled : Bool = true
  property name : String
end

ADI.register_extension "test", Schema

ADI.configure({
  test: {
    name: "Fred",
  },
})
```

---

## enum Athena::Console::Output::Verbosity #

**URL:** https://athenaframework.org/Console/Output/Verbosity/

**Contents:**
- enum Athena::Console::Output::Verbosity #
- Members#
  - SILENT = -2#
  - QUIET = -1#
  - NORMAL = 0#
  - VERBOSE = 1#
  - VERY_VERBOSE = 2#
  - DEBUG = 3#
- Methods#
  - #debug?#

Verbosity levels determine which messages will be displayed, essentially the same idea as Log::Severity but for console output.

As used in the previous example, the verbosity can be controlled on a command invocation basis using a CLI option, but may also be globally set via the SHELL_VERBOSITY environmental variable.

When you output a message via ACON::Output::Interface#puts or ACON::Output::Interface#print, they also provide a way to set the verbosity at which that message should print:

The full stack trace of an exception is printed in ACON::Output::Verbosity::VERBOSE mode or higher.

Silences all output. Equivalent to --silent CLI option or SHELL_VERBOSITY=-2.

Output only errors. Equivalent to -q, --quiet CLI options or SHELL_VERBOSITY=-1.

Normal behavior, display only useful messages. Equivalent not providing any CLI options or SHELL_VERBOSITY=0.

Increase the verbosity of messages. Equivalent to -v, --verbose=1 CLI options or SHELL_VERBOSITY=1.

Display all the informative non-essential messages. Equivalent to -vv, --verbose=2 CLI options or SHELL_VERBOSITY=2.

Display all messages, such as for debugging. Equivalent to -vvv, --verbose=3 CLI options or SHELL_VERBOSITY=3.

Returns true if this enum value equals DEBUG

Returns true if this enum value equals NORMAL

Returns true if this enum value equals QUIET

Returns true if this enum value equals SILENT

Returns true if this enum value equals VERBOSE

Returns true if this enum value equals VERY_VERBOSE

**Examples:**

Example 1 (markdown):
```markdown
# Output nothing
./console my-command --silent

# Output only errors
./console my-command -q
./console my-command --quiet

# Display only useful output
./console my-command

# Increase the verbosity of messages
./console my-command -v

# Also display non-essential information
./console my-command -vv

# Display all messages, such as for debugging
./console my-command -vvv
```

Example 2 (julia):
```julia
protected def execute(input : ACON::Input::Interface, output : ACON::Output::Interface) : ACON::Command::Status
  # Via conditional logic
  if output.verbosity.verbose?
    output.puts "Obj class: #{obj.class}"
  end

  # Inline within the method
  output.puts "Only print this in verbose mode or higher", verbosity: :verbose

  ACON::Command::Status::SUCCESS
end
```

---

## class Athena::Validator::Constraints::IsNil inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/IsNil/

**Contents:**
- class Athena::Validator::Constraints::IsNil inherits Athena::Validator::Constraint #
- Configuration#
  - Optional Arguments#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Constants#
  - NOT_NIL_ERROR = "2c88e3c7-9275-4b9b-81b4-48c6c44b1804"#
- Constructors#

Validates that a value is nil.

Type: String Default: This value should be null.

The message that will be shown if the value is not nil.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class Post
  include AVD::Validatable

  def initialize(@updated_at : Time?); end

  @[Assert::IsNil]
  property updated_at : Time?
end
```

---

## enum Athena::Console::Helper::ProgressIndicator::Format #

**URL:** https://athenaframework.org/Console/Helper/ProgressIndicator/Format/

**Contents:**
- enum Athena::Console::Helper::ProgressIndicator::Format #
- Members#
  - NORMAL = 0#
  - NORMAL_NO_ANSI = 1#
  - VERBOSE = 2#
  - VERBOSE_NO_ANSI = 3#
  - VERY_VERBOSE = 4#
  - VERY_VERBOSE_NO_ANSI = 5#
  - DEBUG = 6#
  - DEBUG_NO_ANSI = 7#

Represents the built in progress indicator formats.

See Built-In Formats for more information.

" %indicator% %message%"

" %indicator% %message% (%elapsed:6s%)"

" %message% (%elapsed:6s%)"

" %indicator% %message% (%elapsed:6s%, %memory:6s%)"

" %message% (%elapsed:6s%, %memory:6s%)"

" %indicator% %message% (%elapsed:6s%, %memory:6s%)"

" %message% (%elapsed:6s%, %memory:6s%)"

Returns true if this enum value equals DEBUG

Returns true if this enum value equals DEBUG_NO_ANSI

Returns true if this enum value equals NORMAL

Returns true if this enum value equals NORMAL_NO_ANSI

Returns true if this enum value equals VERBOSE

Returns true if this enum value equals VERBOSE_NO_ANSI

Returns true if this enum value equals VERY_VERBOSE

Returns true if this enum value equals VERY_VERBOSE_NO_ANSI

---

## class Athena::Validator::Constraints::Sequentially inherits Athena::Validator::Constraints::Composite #

**URL:** https://athenaframework.org/Validator/Constraints/Sequentially/

**Contents:**
- class Athena::Validator::Constraints::Sequentially inherits Athena::Validator::Constraints::Composite #
- Configuration#
  - Required Arguments#
    - constraints#
  - Optional Arguments#
    - groups#
    - payload#
- Usage#
- Constructors#
  - .new(constraints : AVD::Constraints::Composite::Type, groups : Array(String) | String | Nil = nil, payload : Hash(String, String) | Nil = nil)#

Validates a value against a collection of constraints, stopping once the first violation is raised.

Type: Array(AVD::Constraint) | AVD::Constraint

The AVD::Constraint(s) that are to be applied sequentially.

This constraint does not support a message argument.

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Suppose you have an object with a address property which should meet the following criteria:

If you were to apply all of these constraints to the address property, you may run into some problems. For example, multiple violations may be added for the same property, or you may perform a useless and heavy external call to geolocalize the address when it is not in a proper format.

To solve this we can validate these constraints sequentially.

The annotation approach only supports two levels of nested annotations. Manually wire up the constraint via code if you require more than that.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class Location
  include AVD::Validatable

  PATTERN = /some_pattern/

  def initialize(@address : String); end

  @[Assert::Sequentially([
    @[Assert::NotBlank],
    @[Assert::Size(10..)],
    @[Assert::Regex(Location::PATTERN)],
    @[Assert::CustomGeolocalizationConstraint],
  ])]
  getter address : String
end
```

---

## module Athena::Framework::RequestMatcher::Interface #

**URL:** https://athenaframework.org/Framework/RequestMatcher/Interface/

**Contents:**
- module Athena::Framework::RequestMatcher::Interface #
- Direct including types
- Methods#
  - abstract #matches?(request : ATH::Request) : Bool#

Represents a strategy that can be used to match an ATH::Request. This interface can be used as a generic way to determine if some logic should be enabled for a given request based on the configured rules.

Decides whether the rule(s) implemented by the strategy matches the provided request.

---

## struct Athena::MIME::Encoder::QuotedPrintableMIMEHeader inherits Struct #

**URL:** https://athenaframework.org/MIME/Encoder/QuotedPrintableMIMEHeader/

**Contents:**
- struct Athena::MIME::Encoder::QuotedPrintableMIMEHeader inherits Struct #
- Included modules
- Constructors#
  - .new#
- Methods#
  - #encode(input : String, charset : String | Nil = "UTF-8", first_line_offset : Int32 = 0, max_line_length : Int32 | Nil = nil) : String#
  - #initialize#
  - #name : String#

A MIME header encoder based on the Q spec.

Returns an encoded version of the provided input.

first_line_offset may optionally be used depending on the exact implementation if the first line needs to be shorter. max_line_length may optionally be used depending on the exact implementation to customize the max length of each line.

Returns the name of this content encoding scheme.

---

## class Athena::Validator::Constraints::Unique inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/Unique/

**Contents:**
- class Athena::Validator::Constraints::Unique inherits Athena::Validator::Constraint #
- Configuration#
  - Optional Arguments#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Constants#
  - IS_NOT_UNIQUE_ERROR = "fd1f83d6-94b5-44bc-b39d-b1ff367ebfb8"#
- Constructors#

Validates that all elements of an Indexable are unique.

Type: String Default: This collection should contain only unique elements.

The message that will be shown if at least one element is repeated in the collection.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class School
  include AVD::Validatable

  def initialize(@rooms : Array(String)); end

  @[Assert::Unique]
  property rooms : Array(String)
end
```

---

## Introduction

**URL:** https://athenaframework.org/Serializer/

**Contents:**
- Introduction
- Installation#
- Usage#
- Learn More#

The Athena::Serializer component provides enhanced (de)serialization features, with most leveraging annotations.

First, install the component by adding the following to your shard.yml, then running shards install:

The Athena::Serializer component focuses around ASR::Serializer implementations, with the default being [ASR::Serializer] as the main entrypoint into (de)serializing objects. Usage wise, the component functions much like the *::Serializable modules in the stdlib, such as JSON::Serializable. The ASR::Serializable module can be included into a type to make it (de)serializable. From here various annotations may be used to control how the object is (de)serialized.

**Examples:**

Example 1 (yaml):
```yaml
dependencies:
  athena-serializer:
    github: athena-framework/serializer
    version: ~> 0.4.0
```

Example 2 (swift):
```swift
# ExclusionPolicy specifies that all properties should not be (de)serialized
# unless exposed via the `ASRA::Expose` annotation.
@[ASRA::ExclusionPolicy(:all)]
@[ASRA::AccessorOrder(:alphabetical)]
class Example
  include ASR::Serializable

  # Groups can be used to create different "views" of a type.
  @[ASRA::Expose]
  @[ASRA::Groups("details")]
  property name : String

  # The `ASRA::Name` controls the name that this property
  # should be deserialized from or be serialized to.
  # It can also be used to set the default serialized naming strategy on the type.
  @[ASRA::Expose]
  @[ASRA::Name(deserialize: "a_prop", serialize: "a_prop")]
  property some_prop : String

  # Define a custom accessor used to get the value for serialization.
  @[ASRA::Expose]
  @[ASRA::Groups("default", "details")]
  @[ASRA::Accessor(getter: get_title)]
  property title : String

  # ReadOnly properties cannot be set on deserialization
  @[ASRA::Expose]
  @[ASRA::ReadOnly]
  property created_at : Time = Time.utc

  # Allows the property to be set via deserialization,
  # but not exposed when serialized.
  @[ASRA::IgnoreOnSerialize]
  property password : String?

  # Because of the `:all` exclusion policy, and not having the `ASRA::Expose` annotation,
  # these properties are not exposed.
  getter first_name : String?
  getter last_name : String?

  # Runs directly after `self` is deserialized
  @[ASRA::PostDeserialize]
  def split_name : Nil
    @first_name, @last_name = @name.split(' ')
  end

  # Allows using the return value of a method as a key/value in the serialized output.
  @[ASRA::VirtualProperty]
  def get_val : String
    "VAL"
  end

  private def get_title : String
    @title.downcase
  end
end

obj = ASR.serializer.deserialize Example,
  %({"name":"FIRST LAST","a_prop":"STR","title":"TITLE","password":"monkey123","created_at":"2020-10-10T12:34:56Z"}), :json

obj
# => #<Example:0x7f3e3b106740 @created_at=2020-07-05 23:06:58.943298289 UTC, @name="FIRST LAST",
        @some_prop="STR", @title="TITLE", @password="monkey123", @first_name="FIRST", @last_name="LAST">

ASR.serializer.serialize obj, :json
# => {"a_prop":"STR","created_at":"2020-07-05T23:06:58.94Z","get_val":"VAL","name":"FIRST LAST","title":"title"}

ASR.serializer.serialize obj, :json, ASR::SerializationContext.new.groups = ["details"]
# => {"name":"FIRST LAST","title":"title"}
```

---

## class Athena::Validator::Constraints::LessThanOrEqual(ValueType) inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/LessThanOrEqual/

**Contents:**
- class Athena::Validator::Constraints::LessThanOrEqual(ValueType) inherits Athena::Validator::Constraint #
- Configuration#
  - Required Arguments#
    - value#
  - Optional Arguments#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Included modules

Validates that a value is less than or equal to another.

Type: Number | String | Time

Defines the value that the value being validated should be compared to.

Type: String Default: This value should be less than or equal to {{ compared_value }}.

The message that will be shown if the value is not less than or equal to the comparison value.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::Constraint#message for this constraint.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class Employee
  include AVD::Validatable

  def initialize(@age : Number); end

  @[Assert::LessThanOrEqual(60)]
  property age : Number
end
```

---

## module Athena::Framework #

**URL:** https://athenaframework.org/Framework/

**Contents:**
- module Athena::Framework #
- Constants#
  - ENV_NAME = "ATHENA_ENV"#
  - Log = ::Log.for("athena.framework")#
  - VERSION = "0.21.1"#
- Class methods#
  - .environment : String#
  - .run(port : Int32 = 3000, host : String = "0.0.0.0", reuse_port : Bool = false, ssl_context : OpenSSL::SSL::Context::Server | Nil = nil, *, prepend_handlers : Array(HTTP::Handler) = [] of HTTP::Handler) : Nil#
  - .run_console : Nil#
- Macros#

The name of the environment variable used to determine Athena's current environment.

Returns the current environment Athena is in based on ENV_NAME. Defaults to development if not defined.

Runs an HTTP::Server listening on the given port and host.

prepend_handlers can be used to execute an array of HTTP::Handler before Athena takes over. This can be useful to provide backwards compatibility with existing handlers until they can ported to Athena concepts, or for supporting things Athena does not support, such as WebSockets.

See ATH::Controller for more information on defining controllers/route actions.

Runs an ATH::Console::Application as the entrypoint of Athena::Console.

Checkout the Getting Started docs for more information.

Primary entrypoint for configuring Athena Framework applications.

See the Getting Started docs for more information.

This is an alias of ADI.configure.

Registers the provided bundle with the framework.

See the Getting Started docs for more information.

**Examples:**

Example 1 (php):
```php
require "athena"

class ExampleController < ATH::Controller
  @[ARTA::Get("/")]
  def root : String
    "At the index"
  end
end

ATH.run
```

---

## module Athena::Console::Annotations #

**URL:** https://athenaframework.org/Console/Annotations/

**Contents:**
- module Athena::Console::Annotations #

Contains all the Athena::Console based annotations.

---

## class Athena::Console::Input::Definition inherits Reference #

**URL:** https://athenaframework.org/Console/Input/Definition/

**Contents:**
- class Athena::Console::Input::Definition inherits Reference #
- Constructors#
  - .new(definition : ::Hash(String, ACON::Input::Option) | ::Hash(String, ACON::Input::Argument)) : self#
  - .new(definition : Array(ACON::Input::Argument | ACON::Input::Option) = Array(ACON::Input::Argument | ACON::Input::Option).new)#
  - .new(*definitions : ACON::Input::Argument | ACON::Input::Option) : self#
- Methods#
  - #<<(arguments : Array(ACON::Input::Argument | ACON::Input::Option)) : Nil#
  - #<<(argument : ACON::Input::Argument) : Nil#
  - #<<(option : ACON::Input::Option) : Nil#
  - #argument(name_or_index : String | Int32) : ACON::Input::Argument#

Represents a collection of ACON::Input::Arguments and ACON::Input::Options that are to be parsed from an ACON::Input::Interface.

Can be used to set the inputs of an ACON::Command via the ACON::Command#definition= method if so desired, instead of using the dedicated methods.

Adds the provided arguments to self.

Adds the provided argument to self.

Adds the provided options to self.

Returns the ACON::Input::Argument with the provided name_or_index, otherwise raises ACON::Exception::InvalidArgument if that argument is not defined.

Returns the number of ACON::Input::Arguments defined within self.

Returns a ::Hash whose keys/values represent the names and default values of the ACON::Input::Arguments defined within self.

Overrides the arguments of self to those in the provided arguments array.

Overrides the arguments and options of self to those in the provided definition.

Returns true if self has an argument with the provided name_or_index.

Returns true if self has a negation with the provided name, otherwise false.

Returns true if self has an option with the provided name_or_index.

Returns true if self has a shortcut with the provided name, otherwise false.

Returns the name of the ACON::Input::Option that maps to the provided negation.

Returns the ACON::Input::Option with the provided name_or_index, otherwise raises ACON::Exception::InvalidArgument if that option is not defined.

Returns a ::Hash whose keys/values represent the names and default values of the ACON::Input::Options defined within self.

Returns the name of the ACON::Input::Option with the provided shortcut.

Overrides the options of self to those in the provided options array.

Returns an optionally short synopsis based on the ACON::Input::Arguments and ACON::Input::Options defined within self.

The synopsis being the docopt string representing the expected options/arguments. E.g. <name> move <x> <y> [--speed=<kn>]. ameba:disable Metrics/CyclomaticComplexity

---

## module Athena::Console::Spec #

**URL:** https://athenaframework.org/Console/Spec/

**Contents:**
- module Athena::Console::Spec #

Provides helper types for testing ACON::Command and ACON::Applications.

---

## abstract class Athena::Console::Question::AbstractChoice(T, ChoiceType) inherits Reference #

**URL:** https://athenaframework.org/Console/Question/AbstractChoice/

**Contents:**
- abstract class Athena::Console::Question::AbstractChoice(T, ChoiceType) inherits Reference #
- Included modules
- Direct known subclasses
- Constructors#
  - .new(question : String, choices : Indexable(T), default : Int | T | Nil = nil)#
  - .new(question : String, choices : Hash(String | Int32, T), default : T | Nil = nil)#
- Methods#
  - #choices : Hash(String | Int32, T)#
  - #error_message : String#
  - #error_message=(error_message : String) : self#

Base type of choice based questions. See each subclass for more information.

Returns the possible choices.

Returns the message to display if the provided answer is not a valid choice.

Returns/sets the prompt to use for the question. The prompt being the character(s) before the user input.

Returns/sets the prompt to use for the question. The prompt being the character(s) before the user input.

See Validating the Answer.

Sets the validator callback to the provided block. See Validating the Answer.

See Validating the Answer.

---

## struct Athena::Dotenv::Exception::Format::Context inherits Struct #

**URL:** https://athenaframework.org/Dotenv/Exception/Format/Context/

**Contents:**
- struct Athena::Dotenv::Exception::Format::Context inherits Struct #
- Constructors#
  - .new(data : String, path : ::Path | String, line_number : Int32, offset : Int32)#
- Methods#
  - #details : String#
  - #line_number : Int32#
  - #path : String#

Stores contextual information related to an Athena::Dotenv::Exception::Format.

Returns a details string that includes the markup before/after the error, along with what line number and offset the error occurred at.

Returns the line number of the format error.

Returns the path to the improperly formatted .env file.

**Examples:**

Example 1 (julia):
```julia
begin
  dotenv = Athena::Dotenv.new.parse "NAME=Jim\nFOO=BAR BAZ"
rescue ex : Athena::Dotenv::Exception::Format
  ctx = ex.context

  ctx.path        # => ".env"
  ctx.line_number # => 2
  ctx.details     # => "...NAME=Jim\nFOO=BAR BAZ...\n                       ^ line 2 offset 20"
end
```

---

## module Athena::MIME::Exception #

**URL:** https://athenaframework.org/MIME/Exception/

**Contents:**
- module Athena::MIME::Exception #
- Direct including types

Both acts as a namespace for exceptions related to the Athena::MIME component, as well as a way to check for exceptions from the component.

---

## Aliases

**URL:** https://athenaframework.org/Console/aliases/

**Contents:**
- Aliases
- alias ACON #
  - Alias definition
- alias ACONA #
  - Alias definition

Convenience alias to make referencing Athena::Console types easier.

Convenience alias to make referencing ACON::Annotations types easier.

---

## class Athena::Validator::Constraints::Valid inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/Valid/

**Contents:**
- class Athena::Validator::Constraints::Valid inherits Athena::Validator::Constraint #
- Configuration#
  - Optional Arguments#
    - groups#
    - payload#
- Usage#
- Constructors#
  - .new(traverse : Bool = true, groups : Array(String) | String | Nil = nil, payload : Hash(String, String) | Nil = nil)#
- Methods#
  - #traverse? : Bool#

Tells the validator that it should also validate objects embedded as properties on an object being validated.

This constraint does not support a message argument.

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Without this constraint, objects embedded in another object are not valided.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (php):
```php
class SubObjectOne
  include AVD::Validatable

  @[Assert::NotBlank]
  getter string : String = ""
end

class SubObjectTwo
  include AVD::Validatable

  @[Assert::NotBlank]
  getter string : String = ""
end

class MyObject
  include AVD::Validatable

  # This object is not validated when validating `MyObject`.
  getter sub_object_one : SubObjectOne = SubObjectOne.new

  # Have the validator also validate `SubObjectTwo` when validating `MyObject`.
  @[Assert::Valid]
  getter sub_object_two : SubObjectTwo = SubObjectTwo.new
end
```

---

## annotation Athena::Framework::Annotations::MapQueryString #

**URL:** https://athenaframework.org/Framework/Annotations/MapQueryString/

**Contents:**
- annotation Athena::Framework::Annotations::MapQueryString #
- Configuration#
  - Optional Arguments#
    - validation_groups#

Enables the ATHR::RequestBody resolver for the parameter this annotation is applied to based on the request's query string. See the related resolver documentation for more information.

Type: Array(String) | AVD::Constraints::GroupSequence | Nil Default: nil

The validation groups that should be used when validating the resolved object.

**Examples:**

Example 1 (php):
```php
class ArticleController < ATH::Controller
  @[ARTA::Get("/articles")]
  def articles(
    @[ATHA::MapQueryString]
    pagination_context : PaginationContext,
  ) : Array(Article)
    # ...
  end
end
```

---

## class Athena::Framework::View::FormatNegotiator inherits Athena::Negotiation::Negotiator #

**URL:** https://athenaframework.org/Framework/View/FormatNegotiator/

**Contents:**
- class Athena::Framework::View::FormatNegotiator inherits Athena::Negotiation::Negotiator #
- Constructors#
  - .new(request_store : ATH::RequestStore, mime_types : Hash(String, Array(String)) = Hash(String, Array(String)).new)#
- Methods#
  - #best(header : String, priorities : Indexable(String) | Nil = nil, strict : Bool = false) : HeaderType | Nil#

An extension of ANG::Negotiator that supports resolving the format based on an applications ATH::Bundle::Schema::FormatListener rules.

See the Getting Started docs for more information.

:inherit: ameba:disable Metrics/CyclomaticComplexity

---

## class Athena::Validator::Constraints::All inherits Athena::Validator::Constraints::Composite #

**URL:** https://athenaframework.org/Validator/Constraints/All/

**Contents:**
- class Athena::Validator::Constraints::All inherits Athena::Validator::Constraints::Composite #
- Configuration#
  - Required Arguments#
    - constraints#
  - Optional Arguments#
    - groups#
    - payload#
- Usage#
- Constructors#
  - .new(constraints : AVD::Constraints::Composite::Type, groups : Array(String) | String | Nil = nil, payload : Hash(String, String) | Nil = nil)#

Validates each element of an Iterable is valid based on a collection of constraints.

Type: Array(AVD::Constraint) | AVD::Constraint

The AVD::Constraint(s) that you want to apply to each element of the underlying iterable.

This constraint does not support a message argument.

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

The annotation approach only supports two levels of nested annotations. Manually wire up the constraint via code if you require more than that.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class Example
  include AVD::Validatable

  def initialize(@strings : Array(String)); end

  # Assert each string is not blank and is at least 5 characters long.
  @[Assert::All([
    @[Assert::NotBlank],
    @[Assert::Size(5..)],
  ])]
  getter strings : Array(String)
end
```

---

## module Athena::MIME::Encoder::EncoderInterface #

**URL:** https://athenaframework.org/MIME/Encoder/EncoderInterface/

**Contents:**
- module Athena::MIME::Encoder::EncoderInterface #
- Direct including types
- Methods#
  - abstract #encode(input : String, charset : String | Nil = "UTF-8", first_line_offset : Int32 = 0, max_line_length : Int32 | Nil = nil) : String#

Returns an encoded version of the provided input.

first_line_offset may optionally be used depending on the exact implementation if the first line needs to be shorter. max_line_length may optionally be used depending on the exact implementation to customize the max length of each line.

---

## class Athena::Framework::View::ViewHandler inherits Reference #

**URL:** https://athenaframework.org/Framework/View/ViewHandler/

**Contents:**
- class Athena::Framework::View::ViewHandler inherits Reference #
- Included modules
- Constructors#
  - .new(url_generator : ART::Generator::Interface, serializer : ASR::SerializerInterface, request_store : ATH::RequestStore, format_handlers : Array(Athena::Framework::View::FormatHandlerInterface), failed_validation_status : HTTP::Status = HTTP::Status::UNPROCESSABLE_ENTITY, empty_content_status : HTTP::Status = HTTP::Status::NO_CONTENT, emit_nil : Bool = false)#
- Methods#
  - #create_redirect_response(view : ATH::ViewBase, location : String, format : String) : ATH::Response#
  - #create_response(view : ATH::ViewBase, request : ATH::Request, format : String) : ATH::Response#
  - #emit_nil=(emit_nil : Bool) : Nil#
  - #handle(view : ATH::ViewBase, request : ATH::Request | Nil = nil) : ATH::Response#
  - #register_handler(format : String, handler : ATH::View::ViewHandlerInterface::HandlerType) : Nil#

Default implementation of ATH::View::ConfigurableViewHandlerInterface.

Creates an ATH::Response based on the provided view that'll redirect to the provided location.

location may either be a URL or the name of a route.

Creates an ATH::Response based on the provided view and request.

Determines if properties with nil values should be emitted.

Handles the conversion of the provided view into an ATH::Response.

If no request is provided, it is fetched from ATH::RequestStore.

Registers the provided handler to handle the provided format.

Sets the groups that should be used as part of ASR::ExclusionStrategies::Groups.

Sets the version that should be used as part of ASR::ExclusionStrategies::Version.

Determines if self can handle the provided format.

First checks if a custom format handler supports the provided format, otherwise falls back on the ASR::SerializerInterface.

---

## module Athena::Validator::Spec #

**URL:** https://athenaframework.org/Validator/Spec/

**Contents:**
- module Athena::Validator::Spec #
    - Getting Started#

A set of testing utilities/types to aid in testing Athena::Validator related types.

Require this module in your spec_helper.cr file.

Add Athena::Spec as a development dependency, then run a shards install. See the individual types for more information.

**Examples:**

Example 1 (markdown):
```markdown
# This also requires "spec" and "athena-spec".
require "athena-validator/spec"
```

---

## Athena::Framework::Bundle::Schema::Cors::Defaults#

**URL:** https://athenaframework.org/Framework/Bundle/Schema/Cors/Defaults/

**Contents:**
- Athena::Framework::Bundle::Schema::Cors::Defaults#
- Configuration Properties
  - allow_credentials#
  - allow_origin#
  - allow_headers#
  - expose_headers#
  - allow_methods#
  - max_age#

CORS defaults that affect all routes globally.

Indicates whether the request can be made using credentials.

Maps to the access-control-allow-credentials header.

Array(String | Regex)

A white-listed array of valid origins. Each origin may be a static String, or a Regex.

Can be set to ["*"] to allow any origin.

The header or headers that can be used when making the actual request.

Can be set to ["*"] to allow any headers.

maps to the access-control-allow-headers header.

Array of headers that the browser is allowed to read from the response.

Maps to the access-control-expose-headers header.

ATH::Listeners::CORS::SAFELISTED_METHODS

The method(s) allowed when accessing the resource.

Maps to the access-control-allow-methods header. Defaults to the CORS-safelisted methods.

Number of seconds that the results of a preflight request can be cached.

Maps to the access-control-max-age header.

---

## module Athena::Framework::Controller::ValueResolvers #

**URL:** https://athenaframework.org/Framework/Controller/ValueResolvers/

**Contents:**
- module Athena::Framework::Controller::ValueResolvers #

This type includes all of the built-in resolvers that Athena uses to try and resolve an argument for a particular controller action parameter. They run in the following order:

ATHR::QueryParameter (110) - Attempts to resolve a value from the ATH::Request query parameters.

ATHR::Enum (105) - Attempts to resolve a value from ATH::Request#attributes into an enum member of the related type. Works well in conjunction with ART::Requirement::Enum.

ATHR::Time (105) - Attempts to resolve a value from the request attributes into a ::Time instance, defaulting to RFC 3339. Format/location can be customized via the ATHA::MapTime annotation.

ATHR::UUID (105) - Attempts to resolve a value from the request attributes into a ::UUID instance.

ATHR::RequestBody (105) - If enabled, attempts to deserialize the request body/query string into the type of the related parameter, running any defined validations if applicable.

ATHR::RequestAttribute (100) - Provides a value stored in ATH::Request#attributes if one with the same name as the action parameter exists.

ATHR::Request (50) - Provides the current ATH::Request if the related parameter is typed as such.

ATHR::DefaultValue (-100) - Provides the default value of the parameter if it has one, or nil if it is nilable.

See each resolver for more detailed information. Custom resolvers may also be defined. See ATHR::Interface for more information.

---

## class Athena::Framework::Exception::HTTPException inherits Exception #

**URL:** https://athenaframework.org/Framework/Exception/HTTPException/

**Contents:**
- class Athena::Framework::Exception::HTTPException inherits Exception #
- Included modules
- Direct known subclasses
- Constructors#
  - .from_status(status : Int32 | HTTP::Status, message : String = "", cause : ::Exception | Nil = nil, headers : HTTP::Headers = HTTP::Headers.new) : self#
  - .new(status : HTTP::Status, message : String, cause : ::Exception | Nil = nil, headers : HTTP::Headers = HTTP::Headers.new)#
  - .new(status_code : Int32, message : String, cause : ::Exception | Nil = nil, headers : HTTP::Headers = HTTP::Headers.new)#
- Methods#
  - #headers : HTTP::Headers#
  - #headers=(headers : HTTP::Headers)#

Represents an HTTP error.

Each child represents a specific HTTP error with the associated status code. Also optionally allows adding headers to the resulting response.

Can be used directly/inherited from to represent non-typical HTTP errors/codes.

Helper method to return the proper exception subclass for the provided status. The message, cause, and headers are passed along as well if provided.

ameba:disable Metrics/CyclomaticComplexity

Instantiates self with the given status and message.

Optionally includes cause, and headers.

Instantiates self with the given status_code and message.

Optionally includes cause, and headers.

Any HTTP response headers associated with self.

Some HTTP errors use response headers to give additional information about self.

Any HTTP response headers associated with self.

Some HTTP errors use response headers to give additional information about self.

The HTTP::Status associated with self.

Returns the HTTP status code of #status.

Serializes self to JSON in the format of {"code":400,"message":"Exception message"}

---

## class Athena::Console::Input::ARGV inherits Athena::Console::Input #

**URL:** https://athenaframework.org/Console/Input/ARGV/

**Contents:**
- class Athena::Console::Input::ARGV inherits Athena::Console::Input #
- Direct known subclasses
- Constructors#
  - .new(tokens : Array(String) = ::ARGV, definition : ACON::Input::Definition | Nil = nil)#
  - .new(*tokens : String)#
- Methods#
  - #first_argument : String | ::Nil#
  - #has_parameter?(*values : String, only_params : Bool = false) : Bool#
  - #parameter(value : String, default : _ = false, only_params : Bool = false)#
  - #to_s(io : IO) : Nil#

An ACON::Input::Interface based on ARGV.

Returns the first argument from the raw un-parsed input. Mainly used to get the command that should be executed. ameba:disable Metrics/CyclomaticComplexity

Returns true if the raw un-parsed input contains one of the provided values.

This method is to be used to introspect the input parameters before they have been validated. It must be used carefully. It does not necessarily return the correct result for short options when multiple flags are combined in the same option.

If only_params is true, only real parameters are checked. I.e. skipping those that come after the -- option.

Returns the value of a raw un-parsed parameter for the provided value..

This method is to be used to introspect the input parameters before they have been validated. It must be used carefully. It does not necessarily return the correct result for short options when multiple flags are combined in the same option.

If only_params is true, only real parameters are checked. I.e. skipping those that come after the -- option.

Returns a string representation of the args passed to the command.

---

## abstract class Athena::Console::Helper inherits Reference #

**URL:** https://athenaframework.org/Console/Helper/

**Contents:**
- abstract class Athena::Console::Helper inherits Reference #
- Included modules
- Direct known subclasses
- Class methods#
  - .format_time(span : Time::Span) : String#
  - .format_time(seconds : Number) : String#
  - .remove_decoration(formatter : ACON::Formatter::Interface, string : String) : String#
  - .width(string : String) : Int32#
- Methods#
  - #helper_set : ACON::Helper::HelperSet | ::Nil#

Contains ACON::Helper::Interface implementations that can be used to help with various tasks. Such as asking questions, customizing the output format, or generating tables.

This class also acts as a base type that implements common functionality between each helper.

Formats the provided span of time as a human readable string.

Formats the provided seconds as a human readable string.

Returns a new string with all of its ANSI formatting removed.

Returns the width of a string; where the width is how many character positions the string will use.

Support double width chars.

Returns the ACON::Helper::HelperSet related to self, if any.

Sets the ACON::Helper::HelperSet related to self.

**Examples:**

Example 1 (yaml):
```yaml
ACON::Helper.format_time 10.seconds # => "10 secs"
ACON::Helper.format_time 4.minutes  # => "4 mins"
ACON::Helper.format_time 74.minutes # => "1 hr"
```

Example 2 (yaml):
```yaml
ACON::Helper.format_time 10   # => "10 secs"
ACON::Helper.format_time 240  # => "4 mins"
ACON::Helper.format_time 4400 # => "1 hr"
```

---

## class Athena::DependencyInjection::ServiceContainer inherits Reference #

**URL:** https://athenaframework.org/DependencyInjection/ServiceContainer/

**Contents:**
- class Athena::DependencyInjection::ServiceContainer inherits Reference #
- Included modules

Where the instantiated services live.

If a service is public, a getter based on the service's name as well as its type is defined. Otherwise, services are only available via constructor DI.

Reduce the amount of duplication when this issue is resolved.

---

## Aliases

**URL:** https://athenaframework.org/Mercure/aliases/

**Contents:**
- Aliases
- alias AMC #
  - Alias definition

Convenience alias to make referencing Athena::Mercure types easier.

---

## module Athena::Serializer::ExclusionStrategies #

**URL:** https://athenaframework.org/Serializer/ExclusionStrategies/

**Contents:**
- module Athena::Serializer::ExclusionStrategies #

Exclusion Strategies allow controlling which properties should be (de)serialized.

Athena::Serializer includes two common strategies: ASR::ExclusionStrategies::Groups, and ASR::ExclusionStrategies::Version.

Custom strategies can be implemented by via ExclusionStrategies::ExclusionStrategyInterface.

Once feasible, support compile time exclusion strategies.

---

## Athena::Framework::Bundle::Schema::Router#

**URL:** https://athenaframework.org/Framework/Bundle/Schema/Router/

**Contents:**
- Athena::Framework::Bundle::Schema::Router#
- Configuration Properties
  - default_uri#
  - http_port#
  - https_port#
  - strict_requirements#

The default URI used to generate URLs in non-HTTP contexts. See the Getting Started docs for more information.

The default HTTP port when generating URLs. See the Getting Started docs for more information.

The default HTTPS port when generating URLs. See the Getting Started docs for more information.

Determines how invalid parameters should be treated when Generating URLs:

---

## class Athena::Dotenv::Exception::Path inherits RuntimeError #

**URL:** https://athenaframework.org/Dotenv/Exception/Path/

**Contents:**
- class Athena::Dotenv::Exception::Path inherits RuntimeError #
- Included modules
- Constructors#
  - .new(path : String | Path, cause : ::Exception | Nil = nil)#

Raised when a .env file is unable to be read, or non-existent.

---

## annotation Athena::Serializer::Annotations::ExclusionPolicy #

**URL:** https://athenaframework.org/Serializer/Annotations/ExclusionPolicy/

**Contents:**
- annotation Athena::Serializer::Annotations::ExclusionPolicy #

Defines the default exclusion policy to use on a class. Valid values: :none, and :all.

Used with ASRA::Expose and ASRA::Exclude.

---

## module Athena::EventDispatcher::EventDispatcherInterface #

**URL:** https://athenaframework.org/EventDispatcher/EventDispatcherInterface/

**Contents:**
- module Athena::EventDispatcher::EventDispatcherInterface #
  - Usage#
    - Listener Priority#
- Included modules
- Direct including types
- Methods#
  - abstract #has_listeners?(event_class : AED::Event.class) : Bool#
  - abstract #has_listeners? : Bool#
  - abstract #listener(callable : AED::Callable) : AED::Callable#
  - #listener(listener : T) : Nil forall T#

An event dispatcher is the primary type of Athena::EventDispatcher. Extends ACTR::EventDispatcher::Interface to add additional functionality. It maintains a registry of listeners, with events also being dispatched via this type. When dispatched, the dispatcher notifies all listeners registered with that event.

Listeners can be added in a few ways, with the simplest being registering a block directly on the dispatcher instance.

Another way involves passing an AED::Callable instance, created manually or via the AED::Event.callable method. Lastly, a type that has one or more AEDA::AsEventListener annotated methods may also be passed.

Once all listeners are registered, you can begin to dispatch events. Dispatching an event is simply calling the #dispatch method with an AED::Event subclass instance as an argument.

As you may have noticed, each way of registering a listener has an optional priority parameter. This value can be a positive or negative integer, with a default of 0 that controls the order in which each listener is executed. The higher the value, the sooner that listener would be executed. If two listeners have the same priority, they are executed in the order in which they were registered with the dispatcher.

While the priority can be any Int32, best practices suggest keeping it in the -255..255 range.

Returns true if this dispatcher has any listeners on the provided event_class.

Returns true if there are any listeners on any event.

Registers the provided callable listener to this dispatcher.

Registers the provided listener instance to this dispatcher.

T is any type that has methods annotated with AEDA::AsEventListener.

Registers the provided callable listener to this dispatcher, overriding its priority with that of the provided priority.

Registers the block as an AED::Callable on the provided event_class, optionally with the provided priority and/or name.

Returns an Array(AED::Callable) for all listeners on the provided event_class.

Returns a hash of all registered listeners as a Hash(AED::Event.class, Array(AED::Callable)).

Deregisters the provided callable from this dispatcher.

The callable may be one retrieved via either #listeners method.

Deregisters listeners based on the provided listener from this dispatcher.

T is any type that has methods annotated with AEDA::AsEventListener.

**Examples:**

Example 1 (php):
```php
class MyEvent < AED::Event; end

dispatcher.listener MyEvent do |event, dispatcher|
  # Do something with the event, and/or dispatcher
end
```

Example 2 (php):
```php
class MyEvent < AED::Event; end

dispatcher = AED::EventDispatcher.new
dispatcher.listener(MyEvent, priority: -10) { pp "callback1" }
dispatcher.listener(MyEvent, priority: 10) { pp "callback2" }
dispatcher.listener(MyEvent) { pp "callback3" }
dispatcher.listener(MyEvent, priority: 20) { pp "callback4" }
dispatcher.listener(MyEvent) { pp "callback5" }

dispatcher.dispatch MyEvent.new
# =>
#   "callback4"
#   "callback2"
#   "callback3"
#   "callback5"
#   "callback1"
```

---

## class Athena::Console::Helper::Table::Cell inherits Reference #

**URL:** https://athenaframework.org/Console/Helper/Table/Cell/

**Contents:**
- class Athena::Console::Helper::Table::Cell inherits Reference #
- Direct known subclasses
- Constructors#
  - .new(value : _ = "", rowspan : Int32 = 1, colspan : Int32 = 1, style : Table::CellStyle | Nil = nil)#
- Methods#
  - #colspan : Int32#
  - #rowspan : Int32#
  - #style : Table::CellStyle | ::Nil#
  - #to_s(io : IO) : Nil#

Represents a cell that can span more than one column/row and/or have a unique style. The cell may also have a value, which represents the value to display in the cell.

See the table docs and ACON::Helper::Table::CellStyle for more information.

Returns how many columns this cell should span.

Returns how many rows this cell should span.

Returns the style representing how this cell should be styled.

Appends a short String representation of this object which includes its class name and its object address.

**Examples:**

Example 1 (json):
```json
table
  .rows([
    [
      "Foo",
      ACON::Helper::Table::Cell.new(
        "Bar",
        style: ACON::Helper::Table::CellStyle.new(
          align: :center,
          foreground: "red",
          background: "green"
        )
      ),
    ],
  ])
```

Example 2 (python):
```python
class Person
  def initialize(@name : String, @age : Int32)
  end
end

Person.new("John", 32).to_s # => #<Person:0x10a199f20>
```

---

## struct Athena::Framework::Bundle inherits Athena::Framework::AbstractBundle #

**URL:** https://athenaframework.org/Framework/Bundle/

**Contents:**
- struct Athena::Framework::Bundle inherits Athena::Framework::AbstractBundle #

The Athena Framework Bundle is responsible for integrating the various Athena components into the Athena Framework. This primarily involves wiring up various types as services, and other DI related tasks.

---

## class Athena::Validator::Constraints::LessThan(ValueType) inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/LessThan/

**Contents:**
- class Athena::Validator::Constraints::LessThan(ValueType) inherits Athena::Validator::Constraint #
- Configuration#
  - Required Arguments#
    - value#
  - Optional Arguments#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Included modules

Validates that a value is less than another.

Type: Number | String | Time

Defines the value that the value being validated should be compared to.

Type: String Default: This value should be less than {{ compared_value }}.

The message that will be shown if the value is not less than the comparison value.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::Constraint#message for this constraint.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class Employee
  include AVD::Validatable

  def initialize(@age : Number); end

  @[Assert::LessThan(60)]
  property age : Number
end
```

---

## module Athena::Validator::Validator::ValidatorInterface #

**URL:** https://athenaframework.org/Validator/Validator/ValidatorInterface/

**Contents:**
- module Athena::Validator::Validator::ValidatorInterface #
- Direct including types
- Methods#
  - abstract #in_context(context : AVD::ExecutionContextInterface) : AVD::Validator::ContextualValidatorInterface#
  - abstract #start_context : AVD::Validator::ContextualValidatorInterface#
  - abstract #validate(value : _, constraints : Array(AVD::Constraint) | AVD::Constraint | Nil = nil, groups : Array(String) | String | AVD::Constraints::GroupSequence | Nil = nil) : AVD::Violation::ConstraintViolationListInterface#
  - abstract #validate_property(object : AVD::Validatable, property_name : String, groups : Array(String) | String | AVD::Constraints::GroupSequence | Nil = nil) : AVD::Violation::ConstraintViolationListInterface#
  - abstract #validate_property_value(object : AVD::Validatable, property_name : String, value : _, groups : Array(String) | String | AVD::Constraints::GroupSequence | Nil = nil) : AVD::Violation::ConstraintViolationListInterface#

Returns a validator in the provided context.

Violations generated by the returned validator are added to the provided context.

Creates a new AVD::ExecutionContextInterface and returns a new validator for that context.

Violations generated by the returned validator can be accessed via AVD::Validator::ContextualValidatorInterface#violations.

Validates the provided value, optionally against the provided constraints, optionally using the provided groups. AVD::Constraint::DEFAULT_GROUP is assumed if no groups are provided.

Validates a property of the provided object against the constraints defined for that property, optionally using the provided groups. AVD::Constraint::DEFAULT_GROUP is assumed if no groups are provided.

Validates a value against the constraints defined on the property of the provided object. AVD::Constraint::DEFAULT_GROUP is assumed if no groups are provided.

---

## class Athena::Console::Completion::Suggestions inherits Reference #

**URL:** https://athenaframework.org/Console/Completion/Suggestions/

**Contents:**
- class Athena::Console::Completion::Suggestions inherits Reference #
- Methods#
  - #suggest_option(option : ACON::Input::Option) : self#
  - #suggest_options(options : Enumerable(ACON::Input::Option)) : self#
  - #suggest_value(value : String, description : String = "") : self#
  - #suggest_value(value : ACON::Completion::Suggestions::SuggestedValue) : self#
  - #suggest_values(values : Enumerable(String)) : self#
  - #suggest_values(*values : String) : self#
  - #suggested_options#
  - #suggested_values#

Stores all the suggested values/options for the current ACON::Completion::Input.

Adds the provided option to #suggested_options.

Adds each of the provided options to #suggested_options.

Adds the provided value, and optional description to #suggested_values.

Adds the provided value to #suggested_values.

Adds each of the provided values to #suggested_values.

Adds each of the provided values to #suggested_values.

Returns an array of the suggested ACON::Input::Options.

Returns an array of the ACON::Completion::Suggestions::SuggestedValues.

---

## class Athena::Validator::Constraints::NotBlank inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/NotBlank/

**Contents:**
- class Athena::Validator::Constraints::NotBlank inherits Athena::Validator::Constraint #
- Configuration#
  - Optional Arguments#
    - allow_nil#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Constants#
  - IS_BLANK_ERROR = "0d0c3254-3642-4cb0-9882-46ee5918e6e3"#

Validates that a value is not blank; meaning not equal to a blank string, an empty Iterable, false, or optionally nil.

Type: Bool Default: false

If set to true, nil values are considered valid and will not trigger a violation.

Type: String Default: This value should not be blank.

The message that will be shown if the value is blank.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class User
  include AVD::Validatable

  def initialize(@name : String); end

  @[Assert::NotBlank]
  property name : String
end
```

---

## class Athena::Framework::StreamedResponse inherits Athena::Framework::Response #

**URL:** https://athenaframework.org/Framework/StreamedResponse/

**Contents:**
- class Athena::Framework::StreamedResponse inherits Athena::Framework::Response #
- Constructors#
  - .new(status : HTTP::Status | Int32 = HTTP::Status::OK, headers : HTTP::Headers | ATH::Response::Headers = ATH::Response::Headers.new, &block : IO -> Nil)#
  - .new(callback : Proc(IO, Nil), status : HTTP::Status | Int32 = HTTP::Status::OK, headers : HTTP::Headers | ATH::Response::Headers = ATH::Response::Headers.new)#
- Methods#
  - #content=(callback : Proc(IO, Nil))#

Represents an ATH::Response whose content should be streamed to the client as opposed to being written all at once. This can be useful in cases where the response content is too large to fit into memory.

The content is stored in a proc that gets called when self is being written to the response IO. How the output gets written can be customized via an ATH::Response::Writer.

Creates a new response with optional status, and headers arguments.

The block is captured and called when self is being written to the response's IO. This can be useful to reduce memory overhead when needing to return large responses.

Creates a new response with the provided callback and optional status, and headers arguments.

The proc is called when self is being written to the response's IO.

Updates the callback of self.

**Examples:**

Example 1 (json):
```json
require "athena"

class ExampleController < ATH::Controller
  @[ARTA::Get("/users")]
  def users : ATH::Response
    ATH::StreamedResponse.new headers: HTTP::Headers{"content-type" => "application/json; charset=utf-8"} do |io|
      User.all.to_json io
    end
  end
end

ATH.run

# GET /users # => [{"id":1,...},...]
```

---

## alias Athena::Console::Helper::Table::CellType #

**URL:** https://athenaframework.org/Console/Helper/Table/CellType/

**Contents:**
- alias Athena::Console::Helper::Table::CellType #
- Alias definition

The possible types that are accepted as cell values. They are all eventually turned into strings.

---

## abstract class Athena::Console::Command inherits Reference #

**URL:** https://athenaframework.org/Console/Command/

**Contents:**
- abstract class Athena::Console::Command inherits Reference #
  - Creating a Command#
    - Command Lifecycle#
  - Configuring the Command#
    - Output#
    - Input#
  - Testing the Command#
- Direct known subclasses
- Constructors#
  - .new(name : String | Nil = nil)#

An ACON::Command represents a concrete command that can be invoked via the CLI. All commands should inherit from this base type, but additional abstract subclasses can be used to share common logic for related command classes.

A command is defined by extending ACON::Command and implementing the #execute method. For example:

Commands have three lifecycle methods that are invoked when running the command:

In most cases, a command is going to need to be configured to better fit its purpose. The #configure method can be used configure various aspects of the command, such as its name, description, ACON::Inputs, help message, aliases, etc.

The suggested way of setting the name and description of the command is via the ACONA::AsCommand annotation. This enables lazy command instantiation when used within the Athena framework.

The #configure command is called automatically at the end of the constructor method. If your command defines its own, be sure to call super() to also run the parent constructor. super may also be called after setting the properties if they should be used to determine how to configure the command.

The #execute method has access to an ACON::Output::Interface instance that can be used to write messages to display. The output parameter should be used instead of #puts or #print to decouple the command from STDOUT.

See ACON::Output::Interface for more information.

In most cases, a command is going to have some sort of input arguments/options. These inputs can be setup in the #configure method, and accessed via the input parameter within #execute.

See ACON::Input::Interface for more information.

Athena::Console also includes a way to test your console commands without needing to build and run a binary. A single command can be tested via an ACON::Spec::CommandTester and a whole application can be tested via an ACON::Spec::ApplicationTester.

See ACON::Spec for more information.

Returns the default description of self, or nil if it was not set.

Returns the default name of self, or nil if it was not set.

Sets the aliases of self.

Returns/sets the list of aliases that may also be used to execute self in addition to its #name.

Sets the aliases of self.

Returns/sets the list of aliases that may also be used to execute self in addition to its #name.

Returns the ACON::Application associated with self, otherwise nil.

Returns the ACON::Application associated with self, otherwise nil.

Adds an ACON::Input::Argument to self with the provided name. Optionally supports setting its mode, description, default value, and suggested_values.

Also checkout the value completion for how argument values can be auto completed.

Adds an ACON::Input::Argument to this command with the provided name. Optionally supports setting its mode, description, default value.

Accepts a block to use to determine this argument's suggested values. Also checkout the value completion for how argument values can be auto completed.

Determines what values should be added to the possible suggestions based on the provided input.

By default this will fall back on completion of the related input argument/option, but can be overridden if needed.

Sets the ACON::Input::Definition on self.

Sets the ACON::Input::Definition on self.

Sets the ACON::Input::Definition on self.

Sets the #description of self.

Returns the description ofself`.

Returns if self is enabled in the current environment.

Can be overridden to return false if it cannot run under the current conditions.

Sets the #help of self.

Returns/sets the help template for self.

Returns/sets the help template for self.

Returns an ACON:Helper::Interface of the provided helper_class.

Returns/sets an ACON::Helper::HelperSet on self.

Returns/sets an ACON::Helper::HelperSet on self.

Hides self from the command list.

Returns true if self is hidden from the command list, otherwise false.

Makes the command ignore any input validation errors.

Returns the name of self.

Returns the name of self.

Adds an ACON::Input::Option to self with the provided name. Optionally supports setting its shortcut, value_mode, description, and default value.

Also checkout the value completion for how option values can be auto completed.

Adds an ACON::Input::Option to self with the provided name. Optionally supports setting its shortcut, value_mode, description, and default value.

Accepts a block to use to determine this argument's suggested values. Also checkout the value completion for how option values can be auto completed.

Sets the process title of self.

The #help message can include some template variables for the command:

This method returns the #help message with these variables replaced.

Runs the command with the provided input and output, returning the status of the invocation as an ACON::Command::Status.

Returns a short synopsis of self, including its #name and expected arguments/options. For example app:user-create [--dry-run] [--] <username>.

Adds a usage string that will displayed within the Usage section after the auto generated entry.

Returns the list of usages for self.

**Examples:**

Example 1 (php):
```php
@[ACONA::AsCommand("app:create-user")]
class CreateUserCommand < ACON::Command
  protected def configure : Nil
    # ...
  end

  protected def execute(input : ACON::Input::Interface, output : ACON::Output::Interface) : ACON::Command::Status
    # Implement all the business logic here.

    # Indicates the command executed successfully.
    ACON::Command::Status::SUCCESS
  end
end
```

Example 2 (vue):
```vue
@[ACONA::AsCommand("app:create-user")]
class CreateUserCommand < ACON::Command
  protected def configure : Nil
    # ...
  end

  protected def setup(input : ACON::Input::Interface, output : ACON::Output::Interface) : Nil
    # ...
  end

  protected def interact(input : ACON::Input::Interface, output : ACON::Output::Interface) : Nil
    # ...
  end

  protected def execute(input : ACON::Input::Interface, output : ACON::Output::Interface) : ACON::Command::Status
    # Indicates the command executed successfully.
    ACON::Command::Status::SUCCESS
  end
end
```

Example 3 (swift):
```swift
protected def configure : Nil
  self
    .help("Creates a user...") # Shown when running the command with the `--help` option
    .aliases("new-user")       # Alternate names for the command
    .hidden                    # Hide the command from the list
  # ...
end
```

Example 4 (python):
```python
class CreateUserCommand < ACON::Command
  def initialize(@require_password : Bool = false)
    super()
  end

  protected def configure : Nil
    self
      .argument("password", @require_password ? ACON::Input::Argument::Mode::REQUIRED : ACON::Input::Argument::Mode::OPTIONAL)
  end
end
```

---

## class Athena::Framework::Console::Application inherits Athena::Console::Application #

**URL:** https://athenaframework.org/Framework/Console/Application/

**Contents:**
- class Athena::Framework::Console::Application inherits Athena::Console::Application #

Entrypoint for the Athena::Console integration.

Checkout the Getting Started docs for more information.

**Examples:**

Example 1 (markdown):
```markdown
# Require your code
require "./main"

# Run the application
ATH.run_console
```

---

## annotation Athena::DependencyInjection::AutoconfigureTag #

**URL:** https://athenaframework.org/DependencyInjection/AutoconfigureTag/

**Contents:**
- annotation Athena::DependencyInjection::AutoconfigureTag #
    - Example#

Similar to ADI::Autoconfigure but specialized for easily configuring tags. Accepts an optional tag name as the first positional parameter, otherwise defaults to the FQN of the type. Named arguments may also be provided that'll be added to the tag as attributes.

This type is best used in conjunction with ADI::TaggedIterator.

**Examples:**

Example 1 (julia):
```julia
# All services including `SomeInterface` will be tagged with `"some-tag"`.
@[ADI::AutoconfigureTag("some-tag")]
module SomeInterface; end

# All services including `OtherInterface` will be tagged with `"OtherInterface"`.
@[ADI::AutoconfigureTag]
module OtherInterface; end
```

---

## struct Athena::Console::Cursor inherits Struct #

**URL:** https://athenaframework.org/Console/Cursor/

**Contents:**
- struct Athena::Console::Cursor inherits Struct #
- Constructors#
  - .new(output : ACON::Output::Interface, input : IO = STDIN)#
- Methods#
  - #clear_line : self#
  - #clear_line_after : self#
  - #clear_output : self#
  - #clear_screen : self#
  - #current_position : ::Tuple(Int32, Int32)#
  - #hide : self#

Provides an OO way to interact with the console window, allows writing on any position of the output.

Clears the current line.

Clears the current line after the cursor's current position.

Clears the output from the cursors' current position to the end of the screen.

Clears the entire screen.

Returns the current column, row position of the cursor.

Moves the cursor down lines lines.

Moves the cursor left lines lines.

Moves the cursor right lines lines.

Moves the cursor to the provided column.

Moves the cursor to the provided column, row position.

Moves the cursor up lines lines.

Restores the position set via #save_position.

Saves the current position such that it could be restored via #restore_position.

**Examples:**

Example 1 (php):
```php
@[ACONA::AsCommand("cursor")]
class CursorCommand < ACON::Command
  protected def execute(input : ACON::Input::Interface, output : ACON::Output::Interface) : ACON::Command::Status
    cursor = ACON::Cursor.new output

    # Move the cursor to a specific column, row position.
    cursor.move_to_position 50, 3

    # Write text at that location.
    output.puts "Hello!"

    # Clear the current line.
    cursor.clear_line

    ACON::Command::Status::SUCCESS
  end
end
```

---

## class Athena::Validator::Constraints::IsFalse inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/IsFalse/

**Contents:**
- class Athena::Validator::Constraints::IsFalse inherits Athena::Validator::Constraint #
- Configuration#
  - Optional Arguments#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Constants#
  - NOT_FALSE_ERROR = "55c076a0-dbaf-453c-90cf-b94664276dbc"#
- Constructors#

Validates that a value is false.

Type: String Default: This value should be false.

The message that will be shown if the value is not false.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class Post
  include AVD::Validatable

  def initialize(@is_published : Bool); end

  @[Assert::IsFalse]
  property is_published : Bool
end
```

---

## class Athena::Console::Output::Null inherits Reference #

**URL:** https://athenaframework.org/Console/Output/Null/

**Contents:**
- class Athena::Console::Output::Null inherits Reference #
- Included modules
- Methods#
  - #decorated=(decorated : Bool) : Nil#
  - #decorated? : Bool#
  - #formatter : ACON::Formatter::Interface#
  - #formatter=(formatter : ACON::Formatter::Interface) : Nil#
  - #print(message : String | Enumerable(String), verbosity : ACON::Output::Verbosity = :normal, output_type : ACON::Output::Type = :normal) : Nil#
  - #print(message, verbosity : ACON::Output::Verbosity = :normal, output_type : ACON::Output::Type = :normal) : Nil#
  - #puts(message : String | Enumerable(String), verbosity : ACON::Output::Verbosity = :normal, output_type : ACON::Output::Type = :normal) : Nil#

An ACON::Output::Interface that does not output anything, such as for tests.

Sets if printed messages should be decorated.

Returns true if printed messages should have their decorations applied. I.e. ACON::Formatter::OutputStyleInterface.

Returns the ACON::Formatter::Interface used by self.

Sets the ACON::Formatter::Interface used by self.

Returns the minimum ACON::Output::Verbosity required for a message to be printed.

Set the minimum ACON::Output::Verbosity required for a message to be printed.

---

## class Athena::Console::Application inherits Reference #

**URL:** https://athenaframework.org/Console/Application/

**Contents:**
- class Athena::Console::Application inherits Reference #
  - Default Command#
  - Single Command Applications#
  - Custom Applications#
- Constructors#
  - .new(name : String, version : String = "UNKNOWN")#
- Methods#
  - #add(command : ACON::Command) : ACON::Command | Nil#
  - #auto_exit=(auto_exit : Bool)#
  - #auto_exit? : Bool#

A container for a collection of multiple ACON::Command, and serves as the entry point of a CLI application. This class is optimized for a standard CLI environment; but it may be subclassed to provide a more specialized/customized entry point.

The default command represents which command should be executed when no command name is provided; by default this is ACON::Commands::List. For example, running ./console would result in all the available commands being listed. The default command can be customized via #default_command.

In some cases a CLI may only have one supported command in which passing the command's name each time is tedious. In such a case an application may be declared as a single command application via the optional second argument to #default_command. Passing true makes it so that any supplied arguments or options are passed to the default command.

Arguments and options passed to the default command are ignored when #single_command? is false.

ACON::Application may also be extended in order to better fit a given application. For example, it could define some global custom styles, override the array of default commands, or customize the default input options, etc.

Adds the provided command instance to self, allowing it be executed.

By default, the application will auto exit after executing a command. This method can be used to disable that functionality.

If set to false, the ACON::Command::Status of the executed command is returned from #run. Otherwise the #run method never returns.

Returns if application should exit automatically after executing a command. See #auto_exit=.

By default, the application will gracefully handle exceptions raised as part of the execution of a command by formatting and outputting it; including varying levels of information depending on the ACON::Output::Verbosity level used.

If set to false, that logic is bypassed and the exception is bubbled up to where #run was invoked from.

Returns if the application should handle exceptions raised within the execution of a command. See #catch_exceptions=.

Allows setting the ACON::Loader::Interface that should be used by self. See the related interface for more information.

Returns all commands within self, optionally only including the ones within the provided namespace. The keys of the returned hash represent the full command names, while the values are the command instances.

Determines what values should be added to the possible suggestions based on the provided input.

By default this handles completing commands and options, but can be overridden if needed.

Sets the default command to the command with the provided name.

For example, executing the following console script via ./console would result in Hello world! being printed instead of the default list output.

For example, executing the following console script via ./console George would result in Hello George! being printed. If we tried this again without setting single_command to true, it would error saying `Command 'George' is not defined.

Returns the ACON::Input::Definition associated with self. See the related type for more information.

Sets the definition that should be used by self. See the related type for more information.

Yields each command within self, optionally only yields those within the provided namespace.

Returns the ACON::Command with the provided name, which can either be the full name, an abbreviation, or an alias. This method will attempt to find the best match given an abbreviation of a name or alias.

Raises an ACON::Exception::CommandNotFound exception when the provided name is incorrect or ambiguous.

ameba:disable Metrics/CyclomaticComplexity

Returns the full name of a registered namespace with the provided name, which can either be the full name or an abbreviation.

Raises an ACON::Exception::NamespaceNotFound exception when the provided name is incorrect or ambiguous.

Returns the ACON::Command with the provided name.

Raises an ACON::Exception::CommandNotFound exception when a command with the provided name does not exist.

Returns true if a command with the provided name exists, otherwise false.

By default this is the same as #long_version, but can be overridden to provide more in-depth help/usage instructions for self.

Returns/sets the ACON::Helper::HelperSet associated with self.

The default helper set includes:

Returns/sets the ACON::Helper::HelperSet associated with self.

The default helper set includes:

Returns the #name and #version of the application. Used when the -V or --version option is passed.

Returns the name of this CLI application.

Returns all unique namespaces used by currently registered commands, excluding the global namespace.

Creates and #adds an ACON::Command with the provided name; executing the block when the command is invoked.

Runs the current application, optionally with the provided input and output.

Returns the ACON::Command::Status of the related command execution if #auto_exit? is false. Will gracefully handle exceptions raised within the command execution unless #catch_exceptions? is false.

Returns true if self only supports a single command. See Single Command Applications for more information.

Returns the version of this CLI application.

**Examples:**

Example 1 (markdown):
```markdown
application = ACON::Application.new "My CLI"
application.auto_exit = false
exit_status = application.run
exit_status # => ACON::Command::Status::SUCCESS

application.auto_exit = true
exit_status = application.run

# This line is never reached.
exit_status
```

Example 2 (julia):
```julia
application = ACON::Application.new "My CLI"

application.register "foo" do |input, output, command|
  output.puts %(Hello #{input.argument "name"}!)

  # Denote that this command has finished successfully.
  ACON::Command::Status::SUCCESS
end.argument("name", :required)

application.default_command "foo", true
application.catch_exceptions = false

application.run # => Not enough arguments (missing: 'name'). (Athena::Console::Exception::Runtime)
```

Example 3 (julia):
```julia
application = ACON::Application.new "My CLI"

application.register "foo" do |_, output|
  output.puts "Hello world!"
  ACON::Command::Status::SUCCESS
end

application.default_command "foo"

application.run

./console # => Hello world!
```

Example 4 (julia):
```julia
application = ACON::Application.new "My CLI"

application.register "foo" do |input, output, command|
  output.puts %(Hello #{input.argument "name"}!)
  ACON::Command::Status::SUCCESS
end.argument("name", :required)

application.default_command "foo", true

application.run
```

---

## Introduction

**URL:** https://athenaframework.org/Contracts/

**Contents:**
- Introduction
- Installation#
- Usage#

A set of abstractions extracted out of the Athena components. Can be used to build on semantics that the Athena components proved useful.

First, install the component by adding the following to your shard.yml, then running shards install:

The Athena::Contracts component provides types and interfaces to achieve loose coupling and interoperability. The intended use case is that other components, or third party libraries, can depend upon the contracts component and use its interfaces. Then, the code could be usable with any implementation that is also based on them. It could be an Athena component, or another one provided by the greater Crystal community.

**Examples:**

Example 1 (yaml):
```yaml
dependencies:
  athena-contracts:
    github: athena-framework/contracts
    version: ~> 0.1.0
```

---

## struct Athena::Framework::RequestMatcher::Attributes inherits Struct #

**URL:** https://athenaframework.org/Framework/RequestMatcher/Attributes/

**Contents:**
- struct Athena::Framework::RequestMatcher::Attributes inherits Struct #
- Included modules
- Constructors#
  - .new(regexes : Hash(String, Regex))#
- Methods#
  - #matches?(request : ATH::Request) : Bool#

Checks if all specified ATH::Request#attributes match the provided patterns.

Decides whether the rule(s) implemented by the strategy matches the provided request.

---

## module Athena::Framework::Listeners #

**URL:** https://athenaframework.org/Framework/Listeners/

**Contents:**
- module Athena::Framework::Listeners #

The event listeners that act upon ATH::Events to handle a request. Custom listeners can also be defined, see AEDA::AsEventListener.

See each listener and the Getting Started docs for more information.

---

## class Athena::Console::Completion::Input inherits Athena::Console::Input::ARGV #

**URL:** https://athenaframework.org/Console/Completion/Input/

**Contents:**
- class Athena::Console::Completion::Input inherits Athena::Console::Input::ARGV #
- Constructors#
  - .from_string(input : String, current_index : Int32) : self#
  - .from_tokens(tokens : Array(String), current_index : Int32) : self#
- Methods#
  - #bind(definition : ACON::Input::Definition) : Nil#
  - #completion_name : String | ::Nil#
  - #completion_type : ACON::Completion::Input::Type#
  - #completion_value : String#
  - #must_suggest_argument_values_for?(argument_name : String) : Bool#

A specialization of ACON::Input::ARGV that allows for unfinished name/values. Exposes information about the name, type, and value of the value/name being completed.

ameba:disable Metrics/CyclomaticComplexity

Returns the name of the argument/option when completing a value.

Returns which type of completion is required.

Returns the value typed by the user, or empty string.

Returns true if this input is able to suggest values for the provided argument_name.

Returns true if this input is able to suggest values for the provided option_name.

Returns the current token of the cursor, or last token if the cursor is at the end of the input.

---

## struct Athena::Serializer::Serializer inherits Struct #

**URL:** https://athenaframework.org/Serializer/Serializer/

**Contents:**
- struct Athena::Serializer::Serializer inherits Struct #
- Included modules
- Constructors#
  - .new(navigator_factory : ASR::Navigators::NavigatorFactoryInterface = ASR::Navigators::NavigatorFactory.new)#
- Methods#
  - #deserialize(type : _, data : String | IO, format : ASR::Format | String, context : ASR::DeserializationContext = ASR::DeserializationContext.new)#
  - #serialize(data : _, format : ASR::Format | String, io : IO, context : ASR::SerializationContext = ASR::SerializationContext.new, **named_args) : Nil#
  - #serialize(data : _, format : ASR::Format | String, context : ASR::SerializationContext = ASR::SerializationContext.new, **named_args) : String#

Default implementation of ASR::SerializerInterface.

Provides the main API used to (de)serialize objects.

Custom formats can be implemented by creating the required visitors for that type, then overriding #get_deserialization_visitor_class and #get_serialization_visitor_class.

Serializes the provided data into format writing it to the provided io, optionally with the provided context.=

Serializes the provided data into format, optionally with the provided context.

**Examples:**

Example 1 (julia):
```julia
# Redefine the visitor class getters in order to first check for custom formats.
# This assumes these visitor types are defined, with the proper logic to handle
# the (de)serialization process.
struct Athena::Serializer::Serializer
  protected def get_deserialization_visitor_class(format : ASR::Format | String)
    return MessagePackDeserializationVisitor if format == "message_pack"

    previous_def
  end

  protected def get_serialization_visitor_class(format : ASR::Format | String)
    return MessagePackSerializationVisitor if format == "message_pack"

    previous_def
  end
end
```

---

## Aliases

**URL:** https://athenaframework.org/DependencyInjection/aliases/

**Contents:**
- Aliases
- alias ADI #
  - Alias definition

Convenience alias to make referencing Athena::DependencyInjection types easier.

---

## module Athena::Console::Question::Base(T) #

**URL:** https://athenaframework.org/Console/Question/Base/

**Contents:**
- module Athena::Console::Question::Base(T) #
- Direct including types
- Constructors#
  - .new(question : String, default : T)#
- Methods#
  - #default : T#
  - #hidden=(hidden : Bool) : self#
  - #hidden? : Bool#
  - #hidden_fallback=(hidden_fallback : Bool)#
  - #hidden_fallback? : Bool#

Common logic shared between all question types. See each type for more information.

Returns the default value if no valid input is provided.

Sets if the answer should be hidden. See Hiding User Input.

Returns the answer should be hidden. See Hiding User Input.

If hidden questions should fallback on making the response visible if it was unable to be hidden. See Hiding User Input.

If hidden questions should fallback on making the response visible if it was unable to be hidden. See Hiding User Input.

Returns how many attempts the user has to enter a valid value when a #validator is set. See Validating the Answer.

Allow at most attempts for the user to enter a valid value when a #validator is set. If attempts is nil, they have an unlimited amount.

See Validating the Answer.

If multi line text should be allowed in the response. See Multiline Input.

If multi line text should be allowed in the response. See Multiline Input.

See Normalizing the Answer.

Sets the normalizer callback to this block. See Normalizing the Answer.

See Normalizing the Answer.

Returns the question that should be asked.

Returns/sets if the answer value should be automatically trimmed. See Trimming the Answer.

Returns/sets if the answer value should be automatically trimmed. See Trimming the Answer.

---

## class Athena::Framework::Exception::ServiceUnavailable inherits Athena::Framework::Exception::HTTPException #

**URL:** https://athenaframework.org/Framework/Exception/ServiceUnavailable/

**Contents:**
- class Athena::Framework::Exception::ServiceUnavailable inherits Athena::Framework::Exception::HTTPException #
- Constructors#
  - .new(message : String, retry_after : Number | String | Nil = nil, cause : ::Exception | Nil = nil, headers : HTTP::Headers = HTTP::Headers.new)#

See Athena::Framework::Exception::HTTPException#new.

If retry_after is provided, adds a retry-after header that represents the number of seconds or HTTP-date after which the request may be retried.

---

## class Athena::Console::Helper::Table::Style inherits Reference #

**URL:** https://athenaframework.org/Console/Helper/Table/Style/

**Contents:**
- class Athena::Console::Helper::Table::Style inherits Reference #
- Methods#
  - #align(align : ACON::Helper::Table::Alignment) : self#
  - #border_format(format : String) : self#
  - #cell_header_format(format : String) : self#
  - #cell_row_content_format(format : String) : self#
  - #cell_row_format(format : String) : self#
  - #clone#
  - #crossing_chars(cross : String | Char, top_left : String | Char, top_middle : String | Char, top_right : String | Char, middle_right : String | Char, bottom_right : String | Char, bottom_middle : String | Char, bottom_left : String | Char, middle_left : String | Char, top_left_bottom : String | Char | Nil = nil, top_middle_bottom : String | Char | Nil = nil, top_right_bottom : String | Char | Nil = nil) : self#
  - #default_crossing_char(char : String | Char) : self#

Represents the overall style for a table. Including the characters that make up the row/column separators, crosses, cell formats, and default alignment.

This class provides a fluent interface for configuring each part of the style.

Sets the default cell alignment for the table.

See ACON::Helper::Table::Alignment.

Sets the sprintf format string for the border, defaulting to "%s".

For example, if set to "~%s~" with the cell's content being text:

Customizing this format can mess with the formatting of the whole table.

Sets the sprintf format string used for table headings, defaulting to "<info>%s</info>".

Sets the sprintf format string used for cell contents, defaulting to " %s ".

For example, if set to " =%s= " with the cell's content being text:

Sets the sprintf format string used for cell contents, defaulting to "%s".

For example, if set to "~%s~" with the cell's content being text:

Customizing this format can mess with the formatting of the whole table.

Returns a copy of self with all instance variables cloned.

Sets the crossing characters individually, defaulting to "+". See #default_crossing_char(char) to default them all to a single character.

#8 top_left_bottom - defaults to middle_left if nil

Sets the default character used for each cross type.

Sets the sprintf format string used for footer titles, defaulting to "<fg=black;bg=white;options=bold> %s </>".

Sets the sprintf format string used for header titles, defaulting to "<fg=black;bg=white;options=bold> %s </>".

Sets the horizontal border chars, defaulting to "-".

inside defaults to outside if not provided.

Sets the the character that is added to the cell to ensure its content has the correct ACON::Helper::Table::Alignment, defaulting to ' '.

For example, if the padding character was '_' with a left alignment:

Sets the vertical border chars, defaulting to "|".

inside defaults to outside if not provided.

**Examples:**

Example 1 (yaml):
```yaml
~+------+~
~|~ text ~|~
~+------+~
```

Example 2 (yaml):
```yaml
+--------+
| =text= |
+--------+
```

Example 3 (yaml):
```yaml
+------+
|~ text ~|
+------+
```

Example 4 (rust):
```rust
1═══════════════2══════════════════════════2══════════════════3
║ ISBN          │ Title                    │ Author           ║
8═══════════════0══════════════════════════0══════════════════4
║ 99921-58-10-7 │ Divine Comedy            │ Dante Alighieri  ║
║ 9971-5-0210-0 │ A Tale of Two Cities     │ Charles Dickens  ║
8───────────────0──────────────────────────0──────────────────4
║ 960-425-059-0 │ The Lord of the Rings    │ J. R. R. Tolkien ║
║ 80-902734-1-6 │ And Then There Were None │ Agatha Christie  ║
7═══════════════6══════════════════════════6══════════════════5
```

---

## class Athena::Console::Input::Argument inherits Reference #

**URL:** https://athenaframework.org/Console/Input/Argument/

**Contents:**
- class Athena::Console::Input::Argument inherits Reference #
- Constructors#
  - .new(name : String, mode : ACON::Input::Argument::Mode = :optional, description : String = "", default = nil, suggested_values : Array(String) | Proc(ACON::Completion::Input, Array(String)) | Nil = nil)#
- Methods#
  - #complete(input : ACON::Completion::Input, suggestions : ACON::Completion::Suggestions) : Nil#
  - #default(type : T.class) : T forall T#
  - #default#
  - #default=(default = nil)#
  - #description : String#
  - #has_completion? : Bool#

Represents a value (or array of values) provided to a command as a ordered positional argument, that can either be required or optional, optionally with a default value and/or description.

Arguments are strings separated by spaces that come after the command name. For example, ./console test arg1 "Arg2 with spaces".

Arguments can be added via the ACON::Command#argument method, or by instantiating one manually as part of an ACON::Input::Definition. The value of the argument could then be accessed via one of the ACON::Input::Interface#argument overloads.

See ACON::Input::Interface for more examples on how arguments/options are parsed, and how they can be accessed.

Determines what values should be added to the possible suggestions based on the provided input.

Returns the default value of self, if any, converted to the provided type.

Returns the default value of self, if any.

Sets the default value of self.

Returns the description of self.

Returns true if this argument is able to suggest values, otherwise false

Returns true if self expects an array of values, otherwise false. ameba:disable Naming/PredicateName

Returns the ACON::Input::Argument::Mode of self.

Returns the name of the self.

Returns true if self is a required argument, otherwise false.

---

## Athena::Framework::Bundle::Schema#

**URL:** https://athenaframework.org/Framework/Bundle/Schema/

**Contents:**
- Athena::Framework::Bundle::Schema#
- Configuration Properties
  - default_locale#
  - trusted_proxies#
  - trusted_headers#
  - trusted_hosts#
  - trusted_header_overrides#

Represents the possible properties used to configure and customize Athena Framework features. See the Getting Started docs for more information.

The default locale is used if no _locale routing parameter has been set.

Array(String) | ::Nil

Controls the IP addresses of trusted proxies that'll be used to get precise information about the client.

See the external documentation for more information.

Athena::Framework::Request::ProxyHeader

Athena::Framework::Request::ProxyHeader[:forwarded_for, :forwarded_port, :forwarded_proto]

Controls which headers your #trusted_proxies use.

See the external documentation for more information.

By default the application can handle requests from any host. This property allows configuring regular expression patterns to control what hostnames the application is allowed to serve. This effectively prevents host header attacks.

If there is at least one pattern defined, requests whose hostname does NOT match any of the patterns, will receive a 400 response.

Hash(Athena::Framework::Request::ProxyHeader, String)

{} of NoReturn => NoReturn

Allows overriding the header name to use for a given ATH::Request::ProxyHeader.

See the external documentation for more information.

---

## struct Athena::Framework::Action(Controller, ReturnType, ParameterTypeTuple, ParametersType) inherits Athena::Framework::ActionBase #

**URL:** https://athenaframework.org/Framework/Action/

**Contents:**
- struct Athena::Framework::Action(Controller, ReturnType, ParameterTypeTuple, ParametersType) inherits Athena::Framework::ActionBase #
- Constructors#
  - .new(action : Proc(ParameterTypeTuple, ReturnType), parameters : ParametersType, annotation_configurations : ADI::AnnotationConfigurations, _controller : Controller.class, _return_type : ReturnType.class)#
- Methods#
  - #annotation_configurations : ADI::AnnotationConfigurations#
  - #controller : Controller.class#
  - #execute(arguments : Array) : ReturnType#
  - #parameters : ParametersType#
  - #return_type : ReturnType.class#

Represents a controller action that will handle a request.

Includes metadata about the endpoint, such as its controller, action parameters and return type, and the action that should be executed.

Returns annotation configurations registered via Athena::Config.configuration_annotation and applied to this action.

These configurations could then be accessed within ATHR::Interfaces and/or ATH::Listenerss.

Returns the ATH::Controller that this action is a part of.

Executes this action with the provided arguments array.

Returns a tuple of ATH::Controller::ParameterMetadata representing the parameters this action expects.

Returns the type that this action returns.

---

## struct Athena::Framework::Controller::ValueResolvers::Time inherits Struct #

**URL:** https://athenaframework.org/Framework/Controller/ValueResolvers/Time/

**Contents:**
- struct Athena::Framework::Controller::ValueResolvers::Time inherits Struct #
- Included modules
- Constructors#
  - .new#
- Methods#
  - #initialize#
  - #resolve(request : ATH::Request, parameter : ATH::Controller::ParameterMetadata) : ::Time | Nil#

Attempts to parse a date(time) string into a ::Time instance.

Optionally allows specifying the format and location to use when parsing the string via the ATHA::MapTime annotation. If no format is specified, defaults to RFC 3339. Defaults to UTC if no location is specified with the annotation.

Raises an ATH::Exception::BadRequest if the date(time) string could not be parsed.

The format can be anything supported via Time::Format.

Returns a value resolved from the provided request and parameter if possible, otherwise returns nil if no parameter could be resolved.

**Examples:**

Example 1 (php):
```php
require "athena"

class ExampleController < ATH::Controller
  @[ARTA::Get(path: "/event/{start_time}/{end_time}")]
  def event(
    @[ATHA::MapTime("%F", location: Time::Location.load("Europe/Berlin"))]
    start_time : Time,
    end_time : Time,
  ) : Nil
    start_time # => 2020-04-07 00:00:00.0 +02:00 Europe/Berlin
    end_time   # => 2020-04-08 12:34:56.0 UTC
  end
end

ATH.run

# GET /event/2020-04-07/2020-04-08T12:34:56Z
```

---

## abstract class Athena::Console::Style::Output inherits Reference #

**URL:** https://athenaframework.org/Console/Style/Output/

**Contents:**
- abstract class Athena::Console::Style::Output inherits Reference #
- Included modules
- Direct known subclasses
- Constructors#
  - .new(output : ACON::Output::Interface)#
- Methods#
  - #create_progress_bar(max : Int32 | Nil = nil) : ACON::Helper::ProgressBar#
  - #decorated=(decorated : Bool) : Nil#
  - #decorated? : Bool#
  - #formatter : ACON::Formatter::Interface#

Base implementation of ACON::Style::Interface and ACON::Output::Interface that provides logic common to all styles.

Creates and returns an ACON::Helper::ProgressBar, optionally with the provided max amount of steps.

See ACON::Output::Interface#decorated=.

See ACON::Output::Interface#decorated?.

See ACON::Output::Interface#formatter.

See ACON::Output::Interface#formatter=.

Prints count empty new lines.

See ACON::Output::Interface#print.

See ACON::Output::Interface#puts.

See ACON::Output::Interface#verbosity.

See ACON::Output::Interface#verbosity=.

---

## class Athena::Validator::Constraints::Callback inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/Callback/

**Contents:**
- class Athena::Validator::Constraints::Callback inherits Athena::Validator::Constraint #
- Configuration#
  - Required Arguments#
    - callback#
    - callback_name#
  - Optional Arguments#
    - groups#
    - payload#
- Usage#
  - Instance Methods#

Allows creating totally custom validation rules, assigning any violations to specific fields on your object. This process is achieved via using one or more callback methods which will be invoked during the validation process.

The callback method itself does fail or return any value. Instead it should directly add violations to the AVD::ExecutionContextInterface argument.

Type: AVD::Constraints::Callback::CallbackProc? Default: nil

The proc that should be invoked as the callback for this constraint.

If this argument is not supplied, the callback_name argument must be.

Type: String? Default: nil

The name of the method that should be invoked as the callback for this constraint.

If this argument is not supplied, the callback argument must be.

This constraint does not support a message argument.

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

The callback constraint supports two callback methods when validating objects, and one callback method when using the constraint directly.

To define an instance callback method, apply the @[Assert::Callback] method to a public instance method defined within an object. This method should accept two arguments: the AVD::ExecutionContextInterface to which violations should be added, and the AVD::Constraint@payload from the related constraint.

More than one callback method can exist on a type, and the method name does not have to be validate.

The callback method can also be defined as a class method. Since class methods do not have access to the related object instance, it is passed in as an argument.

That argument is typed as AVD::Constraints::Callback::Value instance which exposes a AVD::Constraints::Callback::Value#get method that can be used as an easier syntax than .as.

When working with constraints in a non object context, a callback passed in as a proc/block. AVD::Constraints::Callback::CallbackProc alias can be used to more easily create a callback proc. AVD::Constraints::Callback.with_callback can be used to create a callback constraint, using the block as the callback proc. See the related types for more information.

Proc/block based callbacks operate similarly to Class Methods in that they receive the value as an argument.

Convenience method for creating a AVD::Constraints::Callback with the given &block as the callback.

Returns the proc that this constraint should invoke.

Returns the name of the callback method this constraint should invoke.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class Example
  include AVD::Validatable

  SPAM_DOMAINS = ["fake.com", "spam.net"]

  def initialize(@domain_name : String); end

  @[Assert::Callback]
  def validate(context : AVD::ExecutionContextInterface, payload : Hash(String, String)?) : Nil
    # Validate that the `domain_name` is not spammy.
    return unless SPAM_DOMAINS.includes? @domain_name

    context
      .build_violation("This domain name is not legit!")
      .at_path("domain_name")
      .add
  end
end
```

Example 2 (python):
```python
class Example
  include AVD::Validatable

  SPAM_DOMAINS = ["fake.com", "spam.net"]

  @[Assert::Callback]
  def self.validate(value : AVD::Constraints::Callback::ValueContainer, context : AVD::ExecutionContextInterface, payload : Hash(String, String)?) : Nil
    # Get the object from the value, typed as our `Example` class.
    object = value.get self

    # Validate that the `domain_name` is not spammy.
    return unless SPAM_DOMAINS.includes? object.domain_name

    context
      .build_violation("This domain name is not legit!")
      .at_path("domain_name")
      .add
  end

  def initialize(@domain_name : String); end

  getter domain_name : String
end
```

Example 3 (julia):
```julia
# Instantiate a callback constraint, using the block as the callback
constraint = AVD::Constraints::Callback.with_callback do |value, context, payload|
  next if (value = value.get(Int32)).even?

  context.add_violation "This value should be even."
end
```

---

## module Athena::Console::Loader #

**URL:** https://athenaframework.org/Console/Loader/

**Contents:**
- module Athena::Console::Loader #

Contains types related to lazily loading commands.

---

## class Athena::Framework::Events::Response inherits Athena::EventDispatcher::Event #

**URL:** https://athenaframework.org/Framework/Events/Response/

**Contents:**
- class Athena::Framework::Events::Response inherits Athena::EventDispatcher::Event #
- Included modules
- Constructors#
  - .new(request : ATH::Request, response : ATH::Response)#
- Methods#
  - #response : ATH::Response#
  - #response=(response : ATH::Response)#

Emitted after the route's action has been executed, but before the response has been returned to the client.

This event can be listened on to modify the response object further before it is returned; such as adding headers/cookies, compressing the response, etc.

See the Getting Started docs for more information.

---

## Introduction

**URL:** https://athenaframework.org/Console/

**Contents:**
- Introduction
- Installation#
- Usage#
  - Application#
  - Entrypoint#
  - Console Completion#
- Learn More#

The Athena::Console component allows creating CLI based commands. This integration can be a way to define alternate entry points into your business logic, such as for use with scheduled jobs (Cron, Airflow, etc), or one-off internal/administrative things (running migrations, creating users, etc).

First, install the component by adding the following to your shard.yml, then running shards install:

In its most basic form, a ACON::Command consists of an #execute method that provides access to input and output of the command and returns a ACON::Command::Status member.

However, in most cases the command will need to be configured to better fit its use case. Commands may also implement a #configure method to accomplish this. This method is where the ACON::Input::Arguments and ACON::Input::Options may be defined, but also additional help output, aliases, etc.

The core of the console component is the ACON::Application type which is where all the registered ACON::Commands are stored as well as what controls what built-in command(s), global input options (flags), and ACON::Helpers are available. In most cases it provides a good starting point, but may be extended/customized if needed.

The console component best works in conjunction with a dedicated Crystal file that'll be used as the entry point. Ideally this file is compiled into a dedicated binary for use in production, but is invoked directly while developing. Otherwise, any changes made to the files it requires would not be represented. The most basic example would be:

The shebang allows executing the file as a command without needing the crystal prefix. For example ./console list would list all commands.

Athena's completion script can be installed to provide auto tab completion out of the box for command and option names, and values in some cases. The script currently supports the shells: bash (also requires the bash-completion package), fish, and zsh. Run ./console completion --help for installation instructions based on your shell.

The completion script only needs to be installed once, but is specific to the binary used to generate it. E.g. ./console completion would be scoped to the console binary, while ./myapp completion would be scoped to myapp.

Once installed, restart your terminal, and you should be good to go!

The completion script may only be used with real built binaries, not temporary ones such as crystal run src/console.cr -- completion. This is to ensure the performance of the script is sufficient, and to avoid any issues with the naming of the temporary binary.

**Examples:**

Example 1 (yaml):
```yaml
dependencies:
  athena-console:
    github: athena-framework/console
    version: ~> 0.4.0
```

Example 2 (php):
```php
@[ACONA::AsCommand("app:create-user", description: "Manually create a user with the provided username")]
class CreateUserCommand < ACON::Command
  protected def execute(input : ACON::Input::Interface, output : ACON::Output::Interface) : Status
    # Implement all the business logic here.

    # Indicates the command executed successfully.
    Status::SUCCESS
  end
end
```

Example 3 (swift):
```swift
protected def configure : Nil
  self
    .argument("username", :required, "The username of the user")
    .aliases("new-user")
end
```

Example 4 (julia):
```julia
# Create an ACON::Application, passing it the name of your CLI.
# Optionally accepts a second argument representing the version of the application.
application = ACON::Application.new "My CLI"

# Register commands using the `#add` method
application.add CreateUserCommand.new

# Or register a block as a command directly
application.register "foo" do |input, output, cmd|
  # Do stuff

  ACON::Command::Status::SUCCESS
end

# Run the application.
# By default this uses STDIN and STDOUT for its input and output.
application.run
```

---

## class Athena::Console::Output::ConsoleOutput inherits Athena::Console::Output::IO #

**URL:** https://athenaframework.org/Console/Output/ConsoleOutput/

**Contents:**
- class Athena::Console::Output::ConsoleOutput inherits Athena::Console::Output::IO #
- Included modules
- Constructors#
  - .new(verbosity : ACON::Output::Verbosity = :normal, decorated : Bool | Nil = nil, formatter : ACON::Formatter::Interface | Nil = nil)#
- Methods#
  - #decorated=(decorated : Bool) : Nil#
  - #error_output : ACON::Output::Interface#
  - #error_output=(stderr : ACON::Output::Interface) : Nil#
  - #formatter=(formatter : Bool) : Nil#
  - #section : ACON::Output::Section#

An ACON::Output::ConsoleOutputInterface that wraps STDOUT and STDERR.

Returns an ACON::Output::Interface that represents STDERR.

Sets the ACON::Output::Interface that represents STDERR.

Sets the ACON::Output::Interface that represents STDERR.

---

## class Athena::Validator::Constraints::Positive inherits Athena::Validator::Constraints::GreaterThan #

**URL:** https://athenaframework.org/Validator/Constraints/Positive/

**Contents:**
- class Athena::Validator::Constraints::Positive inherits Athena::Validator::Constraints::GreaterThan #
- Configuration#
  - Optional Arguments#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Constructors#
  - .new(message : String = "This value should be positive.", groups : Array(String) | String | Nil = nil, payload : Hash(String, String) | Nil = nil)#
- Methods#

Validates that a value is a positive number. Use AVD::Constraints::PositiveOrZero if you wish to also allow 0.

Type: String Default: This value should be positive.

The message that will be shown if the value is not greater than 0.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

**Examples:**

Example 1 (python):
```python
class Account
  include AVD::Validatable

  def initialize(@balance : Number); end

  @[Assert::Positive]
  property balance : Number
end
```

---

## abstract struct Athena::Framework::Spec::WebTestCase inherits Athena::Spec::TestCase #

**URL:** https://athenaframework.org/Framework/Spec/WebTestCase/

**Contents:**
- abstract struct Athena::Framework::Spec::WebTestCase inherits Athena::Spec::TestCase #
- Included modules
- Direct known subclasses
- Constructors#
  - .new#
- Methods#
  - #create_client : AbstractBrowser#

Base ASPEC::TestCase for web based integration tests.

Currently only API based tests are supported. This type exists to allow for introduction of other types in the future.

Returns the AbstractBrowser instance to which requests should be made against.

---

## class Athena::Serializer::DeserializationContext inherits Athena::Serializer::Context #

**URL:** https://athenaframework.org/Serializer/DeserializationContext/

**Contents:**
- class Athena::Serializer::DeserializationContext inherits Athena::Serializer::Context #
- Methods#
  - #direction : ASR::Context::Direction#

The ASR::Context specific to deserialization.

Returns which (de)serialization action self represents.

---

## class Athena::Validator::Constraints::Blank inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/Blank/

**Contents:**
- class Athena::Validator::Constraints::Blank inherits Athena::Validator::Constraint #
- Configuration#
  - Optional Arguments#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Constants#
  - NOT_BLANK_ERROR = "c815f901-c581-4fb7-a85d-b8c5bc757959"#
- Constructors#

Validates that a value is blank; meaning equal to an empty string or nil.

Type: String Default: This value should be blank.

The message that will be shown if the value is not blank.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class Profile
  include AVD::Validatable

  def initialize(@username : String); end

  @[Assert::Blank]
  property username : String
end
```

---

## module Athena::Framework::HeaderUtils #

**URL:** https://athenaframework.org/Framework/HeaderUtils/

**Contents:**
- module Athena::Framework::HeaderUtils #
- Class methods#
  - .combine(parts : Enumerable) : Hash(String, String | Bool)#
  - .make_disposition(disposition : ATH::BinaryFileResponse::ContentDisposition, filename : String, fallback_filename : String | Nil = nil) : String#
  - .parse(header : String) : Hash(String, String | Bool)#
  - .split(header : String, separators : String) : Array#
  - .to_string(io : IO, collection : Hash, separator : String | Char) : Nil#
  - .to_string(collection : Hash, separator : String | Char) : String#
  - .to_string(separator : String | Char, **parts) : String#
  - .unquote(string : String) : String#

Includes various HTTP header utility methods.

Combines a 2D array of parts into a single Hash.

Each child array should have one or two elements, with the first representing the key and the second representing the value. If there is no second value, true will be used. The keys of the resulting hash are all downcased.

Generates a HTTP content-disposition header value with the provided disposition and filename.

If filename contains non ASCII characters, a sanitized version will be used as part of the filename directive, while an encoded version of it will be used as the filename* directive. The fallback_filename argument can be used to customize the filename directive value in this case.

This method can be used to enable downloads of dynamically generated files. I.e. that can't be handled via a static file event listener.

Checkout the Getting Started docs for an example of how to serve static files.

Splits an HTTP header by one or more separators, provided in priority order. Returns an array with as many levels as there are separators.

Joins a key/value pair collection for use within an HTTP header; writing the data to the provided io.

The key and value of each entry is joined with =, quoting the value if needed. All entries are then joined by the provided separator.

Joins a key/value pair collection into a string for use within an HTTP header.

The key and value of each entry is joined with =, quoting the value if needed. All entries are then joined by the provided separator.

Joins the provided key/value parts into a string for use within an HTTP header.

The key and value of each entry is joined with =, quoting the value if needed. All entries are then joined by the provided separator.

Decodes a quoted string.

**Examples:**

Example 1 (yaml):
```yaml
ATH::HeaderUtils.combine [["foo", "abc"], ["bar"]] # => {"foo" => "abc", "bar" => true}
```

Example 2 (yaml):
```yaml
ATH::HeaderUtils.make_disposition :attachment, "download.txt"         # => attachment; filename="download.txt"
ATH::HeaderUtils.make_disposition :attachment, "föö.html"             # => attachment; filename="f__.html"; filename*=utf-8''f%C3%B6%C3%B6.html
ATH::HeaderUtils.make_disposition :attachment, "föö.html", "foo.html" # => attachment; filename="foo.html"; filename*=utf-8''f%C3%B6%C3%B6.html
```

Example 3 (yaml):
```yaml
ATH::Response.new(
  file_contents,
  headers: HTTP::Headers{"content-disposition" => ATH::HeaderUtils.make_disposition(:attachment, "foo.pdf")}
)
```

Example 4 (typescript):
```typescript
# First splits on `,`, then `;` as defined via the order of the separators.
ATH::HeaderUtils.split "da, en-gb;q=0.8", ",;" # => [["da"], ["en-gb", "q=0.8"]]
ATH::HeaderUtils.split "da, en-gb;q=0.8", ";," # => [["da", "en-gb"], ["q=0.8"]]]
```

---

## abstract class Athena::Contracts::EventDispatcher::Event inherits Reference #

**URL:** https://athenaframework.org/Contracts/EventDispatcher/Event/

**Contents:**
- abstract class Athena::Contracts::EventDispatcher::Event inherits Reference #
  - Stopping Propagation#
- Included modules

An event consists of a subclass of this type, usually with extra context specific information. The metaclass of the event type is used as a unique identifier, which generally should end in a verb that indicates what action has been taken.

Abstract event classes may also be used to share common data/methods between a group of related events. However they cannot be used as a catchall to listen on all events that extend it.

In some cases it may make sense for a listener to prevent any other listeners from being called for a specific event. In order to do this, the listener needs a way to tell the dispatcher that it should stop propagation, i.e. do not notify any more listeners. The base event type includes ACTR::EventDispatcher::StoppableEvent that enables this behavior. Checkout the related module for more information.

**Examples:**

Example 1 (python):
```python
# Define a custom event
class ExceptionRaisedEvent < ACTR::EventDispatcher::Event
  getter exception : Exception

  def initialize(@exception : Exception); end
end

# Dispatch a custom event
exception = ArgumentError.new "Value cannot be negative"
dispatcher.dispatch ExceptionRaisedEvent.new exception
```

---

## abstract class Athena::Console::Input inherits Reference #

**URL:** https://athenaframework.org/Console/Input/

**Contents:**
- abstract class Athena::Console::Input inherits Reference #
- Included modules
- Direct known subclasses
- Constructors#
  - .new(definition : ACON::Input::Definition | Nil = nil)#
- Methods#
  - #argument(name : String, type : T.class) : T forall T#
  - #argument(name : String) : String | Nil#
  - #arguments : ::Hash#
  - #bind(definition : ACON::Input::Definition) : Nil#

Common base implementation of ACON::Input::Interface.

Returns the value of the argument with the provided name converted to the desired type. This method is preferred over #argument since it provides better typing.

Raises an ACON::Exception::Logic if the actual argument value could not be converted to a type.

Returns the raw string value of the argument with the provided name, or nil if is optional and was not provided.

Returns a ::Hash representing the keys and values of the parsed arguments of self.

Binds the provided definition to self. Essentially provides what should be parsed from self.

Escapes a token via Process.quote if it contains unsafe characters.

Returns true if self has an argument with the provided name, otherwise false.

Returns true if self has an option with the provided name, otherwise false.

Sets if self is #interactive?.

Returns true if self represents an interactive input, such as a TTY.

Returns the value of the option with the provided name converted to the desired type. This method is preferred over #option since it provides better typing.

Raises an ACON::Exception::Logic if the actual option value could not be converted to a type.

Returns the raw string value of the option with the provided name, or nil if is optional and was not provided.

Returns a ::Hash representing the keys and values of the parsed options of self.

Sets the value of the argument with the provided name.

Sets the value of the option with the provided name.

Returns the input stream.

Sets the input stream.

Validates the input, asserting all of the required parameters are provided. Raises ACON::Exception::Runtime when not enough arguments are given.

---

## struct Athena::Framework::RouteHandler inherits Struct #

**URL:** https://athenaframework.org/Framework/RouteHandler/

**Contents:**
- struct Athena::Framework::RouteHandler inherits Struct #
- Constructors#
  - .new(event_dispatcher : ACTR::EventDispatcher::Interface, request_store : ATH::RequestStore, argument_resolver : ATH::Controller::ArgumentResolverInterface, controller_resolver : ATH::ControllerResolverInterface)#
- Methods#
  - #handle(request : HTTP::Request) : ATH::Response#
  - #handle(request : ATH::Request) : ATH::Response#
  - #terminate(request : ATH::Request, response : ATH::Response) : Nil#

The entry-point into Athena::Framework.

Emits events that handle a given request and returns the resulting ATH::Response.

Terminates a request/response lifecycle.

Should be called after sending the response to the client.

---

## Athena::Framework::Bundle::Schema::Cors#

**URL:** https://athenaframework.org/Framework/Bundle/Schema/Cors/

**Contents:**
- Athena::Framework::Bundle::Schema::Cors#
- Configuration Properties
  - enabled#

Configures how ATH::Listeners::CORS functions. If no configuration is provided, that listener is disabled and will not be invoked at all.

---

## class Athena::Framework::Spec::HTTPBrowser inherits Athena::Framework::Spec::AbstractBrowser #

**URL:** https://athenaframework.org/Framework/Spec/HTTPBrowser/

**Contents:**
- class Athena::Framework::Spec::HTTPBrowser inherits Athena::Framework::Spec::AbstractBrowser #
- Methods#
  - #container : ADI::Spec::MockableServiceContainer#

Simulates a browser and makes a requests to ATH::RouteHandler.

Returns a reference to an ADI::Spec::MockableServiceContainer to allow configuring the container before a test.

---

## module Athena::MIME::Encoder::AddressEncoderInterface #

**URL:** https://athenaframework.org/MIME/Encoder/AddressEncoderInterface/

**Contents:**
- module Athena::MIME::Encoder::AddressEncoderInterface #
- Direct including types
- Methods#
  - abstract #encode(address : String) : String#

Represents an encoder responsible for encoding an email address.

Returns an encoded version of the provided address.

---

## module Athena::EventDispatcher::Annotations #

**URL:** https://athenaframework.org/EventDispatcher/Annotations/

**Contents:**
- module Athena::EventDispatcher::Annotations #

Contains all the Athena::EventDispatcher based annotations.

---

## class Athena::Console::Input::Hash inherits Athena::Console::Input #

**URL:** https://athenaframework.org/Console/Input/Hash/

**Contents:**
- class Athena::Console::Input::Hash inherits Athena::Console::Input #
- Constructors#
  - .new(args : ::Hash = ::Hash(NoReturn, NoReturn).new, definition : ACON::Input::Definition | Nil = nil)#
  - .new(args : Enumerable, definition : ACON::Input::Definition | Nil = nil)#
  - .new(*args : _) : self#
  - .new : self#
- Methods#
  - #first_argument : String | ::Nil#
  - #has_parameter?(*values : String, only_params : Bool = false) : Bool#
  - #parameter(value : String, default : _ = false, only_params : Bool = false)#

An ACON::Input::Interface based on a Hash.

Primarily useful for manually invoking commands, or as part of tests.

The keys of the input should be the name of the argument. Options should have -- prefixed to their name.

Returns the first argument from the raw un-parsed input. Mainly used to get the command that should be executed.

Returns true if the raw un-parsed input contains one of the provided values.

This method is to be used to introspect the input parameters before they have been validated. It must be used carefully. It does not necessarily return the correct result for short options when multiple flags are combined in the same option.

If only_params is true, only real parameters are checked. I.e. skipping those that come after the -- option.

Returns the value of a raw un-parsed parameter for the provided value..

This method is to be used to introspect the input parameters before they have been validated. It must be used carefully. It does not necessarily return the correct result for short options when multiple flags are combined in the same option.

If only_params is true, only real parameters are checked. I.e. skipping those that come after the -- option.

Returns a string representation of the args passed to the command.

**Examples:**

Example 1 (yaml):
```yaml
ACON::Input::Hash.new(name: "George", "--foo": "bar")
```

---

## Introduction

**URL:** https://athenaframework.org/Mercure/

**Contents:**
- Introduction
- Installation#
  - Setup#
- Usage#
  - Publishing#
  - Subscribing#
  - Authorization#
  - Discovery#
  - Testing#

The Athena::Mercure component allows easily pushing updates to web browsers and other HTTP clients using the Mercure protocol. Because it is built on top of Server-Sent Events (SSE), Mercure is supported out of the box in modern browsers.

Mercure comes with an authorization mechanism, automatic reconnection in case of network issues with retrieving of lost updates, a presence API, "connection-less" push for smartphones and auto-discoverability (a supported client can automatically discover and subscribe to updates of a given resource thanks to a specific HTTP header).

Unlike the Crystal stdlib's HTP::WebSocketHandler, Mercure relies on a centralized hub to manage the persistent SSE connections with the client(s) as opposed to connecting directly to the Crystal HTTP server.

Ultimately this makes the interactions/usage of it simpler since the majority of the complex parts are abstracted away.

First, install the component by adding the following to your shard.yml, then running shards install:

Because the Mercure Hub is a separate process from the Athena HTTP server, it does mean you have to install a Mercure hub by yourself. For production usages, an official and open source (AGPL) hub based on the Caddy web server can be downloaded as a static binary from Mercure.rocks. A Docker image, a Helm chart for Kubernetes and a managed, High Availability Hub are also provided.

Locally, it's easiest to run the Hub via docker compose. A minimal development compose file would look like:

Now that the Mercure hub is running, we can use it to publish updates, and subscribe to receive those updates on the client side.

In order to publish an update, a AMC::Hub instance is required. This type expects to be provided a URL to the Mercure Hub that updates should be sent to, and an AMC::TokenProvider::Interface instance. The token provider is responsible for returning a JWT token used to authenticate the request sent to the Mercure Hub. Most commonly this'll be generated using a static secret key via the Crystal JWT shard.

An AMC::Update instance should then be instantiated that represents the update to publish, and provided to the #publish method of the hub instance. A complete example of this flow is as follows:

Multiple hubs can be used and accessed by name via a AMC::Hub::Registry.

Updates can be subscribed to on any platform that supports Server-Sent Events. For example via JS:

<!doctype html> <html> <body> <script type="application/javascript"> const url = new URL("http://localhost/.well-known/mercure"); url.searchParams.append("topic", "https://example.com/my-topic"); const eventSource = new EventSource(url); console.log("listening..."); eventSource.onmessage = (e) => console.log(e); </script> <h2>Mercure Testing</h2> </body> </html> This code would log each received update to the console. Be sure to call eventSource.close() when no longer needed to avoid a resource leak.

Mercure allows dispatching updates to only authorized clients. To do so, mark an AMC::Update as private via the third constructor argument, the private named argument:

To subscribe to private updates, subscribers must provide to the Hub a JWT containing a topic selector matching by the topic of the update. The preferred way of providing the JWT in a browser context is via a cookie.

To use the cookies, the Athena app and the Mercure Hub must be served from the same domain (can be different sub-domains).

The Mercure component provides AMC::Authorization that can handle generating/setting the cookie given a request/response. Cookies set by this helper class are automatically passed by the browser to the Mercure hub if the withCredentials attribute of EventSource is set to true:

Mercure comes with the ability to automatically discover the hub via a Link header.

The header may be added using the AMC::Discovery type. The client would then be able to extract the hub URL from the Link header to be able to subscribe to updates related to that resource:

The Mercure component comes with some helper types for testing code that publishes updates, without actually sending the update. See AMC::Spec for more information.

**Examples:**

Example 1 (sql):
```sql
flowchart LR

  %% Publishers
  subgraph Publishers
    P1["Athena app"]
    P2["Other HTTP service"]
  end

  %% Mercure Hub
  H["Mercure Hub"]

  %% Subscribers
  subgraph Subscribers
    S1["Browser client JavaScript"]
    S2["Mobile app React Native"]
    S3["Other HTTP client"]
  end

  %% Flows from publishers to hub
  P1 -->|HTTP POST| H
  P2 -->|HTTP POST| H

  %% Flows from hub to subscribers
  H -->|SSE| S1
  H -->|SSE| S2
  H -->|SSE| S3
```

Example 2 (yaml):
```yaml
dependencies:
  athena-mercure:
    github: athena-framework/mercure
    version: ~> 0.1.0
```

Example 3 (yaml):
```yaml
services:
  mercure:
    image: dunglas/mercure
    restart: unless-stopped
    environment:
      SERVER_NAME: ':80' # Disable HTTPS for local dev
      MERCURE_PUBLISHER_JWT_KEY: '!ChangeThisMercureHubJWTSecretKey!'
      MERCURE_SUBSCRIBER_JWT_KEY: '!ChangeThisMercureHubJWTSecretKey!'
      MERCURE_EXTRA_DIRECTIVES: |
        cors_origins http://localhost:3000 # Allow Athena Server
    command: /usr/bin/caddy run --config /etc/caddy/dev.Caddyfile # Enable dev mode
    ports:
      - '80:80'
    volumes:
      - mercure_data:/data
      - mercure_config:/config

volumes:
  mercure_data:
  mercure_config:
```

Example 4 (json):
```json
token_factory = AMC::TokenFactory::JWT.new ENV["MERCURE_JWT_SECRET"]

# Use `*` to give the created JWT access to all topics.
token_provider = AMC::TokenProvider::Factory.new token_factory, publish: ["*"]

hub = AMC::Hub.new ENV["MERCURE_URL"], token_provider, token_factory

update = AMC::Update.new(
  "https://example.com/my-topic",
  {message: "Hello world @ #{Time.local}!"}.to_json
)

hub.publish update # => urn:uuid:e1ee88e2-532a-4d6f-ba70-f0f8bd584022
```

---

## module Athena::Framework::Spec #

**URL:** https://athenaframework.org/Framework/Spec/

**Contents:**
- module Athena::Framework::Spec #
    - Getting Started#

A set of testing utilities/types to aid in testing Athena::Framework related types.

Require this module in your spec_helper.cr file.

Add Athena::Spec as a development dependency, then run a shards install. See the individual types for more information.

**Examples:**

Example 1 (markdown):
```markdown
# This also requires "spec" and "athena-spec".
require "athena/spec"
```

---

## module Athena::Framework::Controller::ValueResolvers::Interface::Typed(*SupportedTypes) #

**URL:** https://athenaframework.org/Framework/Controller/ValueResolvers/Interface/Typed/

**Contents:**
- module Athena::Framework::Controller::ValueResolvers::Interface::Typed(*SupportedTypes) #
- Included modules
- Direct including types

Represents an ATHR::Interface that only supports a subset of types.

See the strict typing section for more information.

---

## struct Athena::MIME::MagicTypesGuesser inherits Struct #

**URL:** https://athenaframework.org/MIME/MagicTypesGuesser/

**Contents:**
- struct Athena::MIME::MagicTypesGuesser inherits Struct #
- Included modules
- Constructors#
  - .new(magic_file : String | Nil = nil)#
- Methods#
  - #guess_mime_type(path : String | Path) : String | Nil#
  - #supported? : Bool#

A AMIME::TypesGuesserInterface implementation based on libmagic.

Only natively supported on Unix systems and MSYS2 where the file package is easily installable. If you have the available lib files on Windows MSVC you may build with -Dathena_use_libmagic to explicitly enable the implementation.

Returns the guessed MIME type for the file at the provided path, or nil if it could not be determined.

How exactly the MIME type is determined is up to each individual implementation.

Returns true if this guesser is supported, otherwise false.

The value may be cached on the class level.

**Examples:**

Example 1 (javascript):
```javascript
guesser.guess_mime_type "/path/to/image.png" # => "image/png"
```

---

## struct Athena::Negotiation::Accept inherits Athena::Negotiation::BaseAccept #

**URL:** https://athenaframework.org/Negotiation/Accept/

**Contents:**
- struct Athena::Negotiation::Accept inherits Athena::Negotiation::BaseAccept #
- Constructors#
  - .new(value : String)#
- Methods#
  - #media_range : String#
  - #sub_type : String#
  - #type : String#

Represents an Accept header media type.

Returns the media range this Accept header represents.

I.e. #header minus the #quality and #parameters.

Returns the sub type for this Accept header. E.x. if the #media_range is application/json, the sub type would be json.

Returns the type for this Accept header. E.x. if the #media_range is application/json, the type would be application.

**Examples:**

Example 1 (javascript):
```javascript
accept = ANG::Accept.new "application/json; q = 0.75; charset = utf-8"

accept.header            # => "application/json; q = 0.75; charset = utf-8"
accept.normalized_header # => "application/json; charset=utf-8"
accept.parameters        # => {"charset" => "utf-8"}
accept.quality           # => 0.75
accept.type              # => "application"
accept.sub_type          # => "json"
```

---

## struct Athena::Console::Spec::ApplicationTester inherits Struct #

**URL:** https://athenaframework.org/Console/Spec/ApplicationTester/

**Contents:**
- struct Athena::Console::Spec::ApplicationTester inherits Struct #
- Included modules
- Constructors#
  - .new(application : ACON::Application)#
- Methods#
  - #application : ACON::Application#
  - #input : ACON::Input::Interface#
  - #input? : ACON::Input::Interface | ::Nil#
  - #run(input : Hash(String, _) = Hash(String, String).new, *, decorated : Bool | Nil = nil, interactive : Bool | Nil = nil, capture_stderr_separately : Bool = false, verbosity : ACON::Output::Verbosity | Nil = nil) : ACON::Command::Status#
  - #run(decorated : Bool = false, interactive : Bool | Nil = nil, capture_stderr_separately : Bool = false, verbosity : ACON::Output::Verbosity | Nil = nil, **input : _)#

Functionally similar to ACON::Spec::CommandTester, but used for testing entire ACON::Applications.

Can be useful if your project extends the base application in order to customize it in some way.

Be sure to set ACON::Application#auto_exit= to false, when testing an entire application.

Returns the ACON::Application instance being tested.

Returns the ACON::Input::Interface being used by the tester.

Returns the ACON::Input::Interface being used by the tester.

Runs the application, with the provided input being used as the input of ACON::Application#run.

Custom values for decorated, interactive, and verbosity can also be provided and will be forwarded to their respective types. capture_stderr_separately makes it so output to STDERR is captured separately, in case you wanted to test error output. Otherwise both error and normal output are captured via ACON::Spec::Tester#display.

Runs the application, with the provided input being used as the input of ACON::Application#run.

Custom values for decorated, interactive, and verbosity can also be provided and will be forwarded to their respective types. capture_stderr_separately makes it so output to STDERR is captured separately, in case you wanted to test error output. Otherwise both error and normal output are captured via ACON::Spec::Tester#display.

Returns the ACON::Command::Status of the command execution, or nil if it has not yet been executed.

---

## struct Athena::Framework::Controller::ParameterMetadata(T) inherits Struct #

**URL:** https://athenaframework.org/Framework/Controller/ParameterMetadata/

**Contents:**
- struct Athena::Framework::Controller::ParameterMetadata(T) inherits Struct #
- Methods#
  - #annotation_configurations : ADI::AnnotationConfigurations#
  - #default_value : T#
  - #default_value? : T | ::Nil#
  - #first_type_of(klass : Type.class) forall Type#
  - #has_default? : Bool#
  - #instance_of?(klass : Type.class) : Bool forall Type#
  - #name : String#
  - #nilable? : Bool#

Represents a controller action parameter. Stores metadata associated with it, such as its name, type, and default value if any.

Returns annotation configurations registered via ADI.configuration_annotation and applied to this parameter.

These configurations could then be accessed within ATHR::Interfaces and/or ATH::Listenerss.

Returns the default value for this parameter, raising an exception if it does not have one.

Returns the default value for this parameter, or nil if it does not have one.

Returns the metaclass of the first matching type variable that is an #instance_of? the provided klass, or nil if none match. If this the #type is union, this would be the first viable type.

Returns true if this parameter has a default value set, otherwise false.

Returns true if this parameter's #type includes the provided klass.

Returns the name of the parameter.

If nil is a valid value for the parameter.

The type of the parameter, i.e. what its type restriction is.

**Examples:**

Example 1 (php):
```php
ATH::Controller::ParameterMetadata(Int32).new("foo").first_type_of(Int32)                            # => Int32.class
ATH::Controller::ParameterMetadata(String | Int32 | Bool).new("foo").first_type_of(Int32)            # => Int32.class
ATH::Controller::ParameterMetadata(String | Int8 | Float64 | Int64).new("foo").first_type_of(Number) # => Float64.class
ATH::Controller::ParameterMetadata(String | Int32 | Bool).new("foo").first_type_of(Float64)          # => nil
```

Example 2 (yaml):
```yaml
ATH::Controller::ParameterMetadata(Int32).new("foo").instance_of?(Int32)       # => true
ATH::Controller::ParameterMetadata(Int32 | Bool).new("foo").instance_of?(Bool) # => true
ATH::Controller::ParameterMetadata(Int32).new("foo").instance_of?(String)      # => false
```

---

## abstract struct Athena::Framework::Response::Writer inherits Struct #

**URL:** https://athenaframework.org/Framework/Response/Writer/

**Contents:**
- abstract struct Athena::Framework::Response::Writer inherits Struct #
    - Example#
- Direct known subclasses
- Constructors#
  - .new#
- Methods#
  - #initialize#
  - abstract #write(output : IO, & : IO -> Nil) : Nil#

Determines how the content of an ATH::Response will be written to the requests' response IO.

By default the content is written directly to the requests' response IO via ATH::Response::DirectWriter. However, custom writers can be implemented to customize that behavior. The most common use case would be for compression.

Writers can also be defined as services and injected into a listener if they require additional external dependencies.

Accepts an output IO that the content of the response should be written to.

**Examples:**

Example 1 (julia):
```julia
require "athena"
require "compress/gzip"

# Define a custom writer to gzip the response
struct GzipWriter < ATH::Response::Writer
  def write(output : IO, & : IO -> Nil) : Nil
    Compress::Gzip::Writer.open(output) do |gzip_io|
      yield gzip_io
    end
  end
end

# Define a new event listener to handle applying this writer
@[ADI::Register]
struct CompressionListener
  @[AEDA::AsEventListener(priority: -256)]
  def on_response(event : ATH::Events::Response) : Nil
    # If the request supports gzip encoding
    if event.request.headers.includes_word?("accept-encoding", "gzip")
      # Change the `ATH::Response` object's writer to be our `GzipWriter`
      event.response.writer = GzipWriter.new

      # Set the encoding of the response to gzip
      event.response.headers["content-encoding"] = "gzip"
    end
  end
end

class ExampleController < ATH::Controller
  @[ARTA::Get("/users")]
  def users : Array(User)
    User.all
  end
end

ATH.run

# GET /users # => [{"id":1,...},...] (gzipped)
```

---

## class Athena::Validator::Constraints::AtLeastOneOf inherits Athena::Validator::Constraints::Composite #

**URL:** https://athenaframework.org/Validator/Constraints/AtLeastOneOf/

**Contents:**
- class Athena::Validator::Constraints::AtLeastOneOf inherits Athena::Validator::Constraints::Composite #
- Configuration#
  - Required Arguments#
    - constraints#
  - Optional Arguments#
    - include_internal_messages#
    - message_collection#
    - message#
    - groups#
    - payload#

Validates that a value satisfies at least one of the provided constraints. Validation stops as soon as one constraint is satisfied.

Type: Array(AVD::Constraint) | AVD::Constraint

The AVD::Constraint(s) from which at least one of has to be satisfied in order for the validation to succeed.

Type: Bool Default: true

If the validation failed message should include the list of messages for the internal constraints. See the message argument for an example.

Type: String Default: Each element of this collection should satisfy its own set of constraints.

The message that will be shown if validation fails and the internal constraint is an AVD::Constraints::All. See the message argument for an example.

Type: String Default: This value should satisfy at least one of the following constraints:

The intro that will be shown if validation fails. By default, it'll be followed by the list of messages from the internal constraints; configurable via the include_internal_messages argument.

For example, if the grades property in the example below fails to validate, the message will be:

This value should satisfy at least one of the following constraints: [1] This value is too short. It should have 3 items or more. [2] Each element of this collection should satisfy its own set of constraints.

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

The annotation approach only supports two levels of nested annotations. Manually wire up the constraint via code if you require more than that.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class Example
  include AVD::Validatable

  def initialize(@password : String, @grades : Array(Int32)); end

  # Asserts the password contains an `#` or is at least 10 characters long.
  @[Assert::AtLeastOneOf([
    @[Assert::Regex(/#/)],
    @[Assert::Size(10..)],
  ])]
  getter password : String

  # Asserts the `grades` array contains at least 3 elements or
  # that each element is greater than or equal to 5.
  @[Assert::AtLeastOneOf([
    @[Assert::Size(3..)],
    @[Assert::All([
      @[Assert::GreaterThanOrEqual(5)],
    ])],
  ])]
  getter grades : Array(Int32)
end
```

---

## class Athena::Validator::Constraints::Size inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/Size/

**Contents:**
- class Athena::Validator::Constraints::Size inherits Athena::Validator::Constraint #
- Configuration#
  - Required Arguments#
    - range#
  - Optional Arguments#
    - exact_message#
      - Placeholders#
    - min_message#
      - Placeholders#
    - max_message#

Validates that the #size of a String or Indexable value is between some minimum and maximum.

The ::Range that defines the minimum and maximum values, if any. An endless range can be used to only have a minimum or maximum.

This constraint does not support a message argument.

Type: String Default: This value should have exactly {{ limit }} {{ type }}.|This value should have exactly {{ limit }} {{ type }}s.

The message that will be shown if min and max values are equal and the underlying value’s size is not exactly this value. The message is pluralized depending on how many elements/characters the underlying value has.

The following placeholders can be used in this message:

Type: String Default: This value is too short. It should have {{ limit }} {{ type }} or more.|This value is too short. It should have {{ limit }} {{ type }}s or more.

The message that will be shown if the underlying value’s size is less than the min. The message is pluralized depending on how many elements/characters the underlying value has.

The following placeholders can be used in this message:

Type: String Default: This value is too long. It should have {{ limit }} {{ type }} or less.|This value is too long. It should have {{ limit }} {{ type }}s or less.

The message that will be shown if the underlying value’s size is greater than the max. The message is pluralized depending on how many elements/characters the underlying value has.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class User
  include AVD::Validatable

  def initialize(@username : String); end

  @[Assert::Size(3..30)]
  property username : String
end
```

---

## class Athena::Validator::Constraints::Regex inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/Regex/

**Contents:**
- class Athena::Validator::Constraints::Regex inherits Athena::Validator::Constraint #
- Configuration#
  - Required Arguments#
    - pattern#
  - Optional Arguments#
    - match#
    - message#
      - Placeholders#
    - groups#
    - payload#

Validates that a value matches a regular expression. The underlying value is converted to a string via #to_s before being validated.

As with most other constraints, nil and empty strings are considered valid values, in order to allow the value to be optional. If the value is required, consider combining this constraint with AVD::Constraints::NotBlank.

The ::Regex pattern that the value should match.

Type: Bool Default: true

If set to false, validation will require the value does NOT match the pattern.

Type: String Default: This value should match '{{ pattern }}'.

The message that will be shown if the value does not match the pattern.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class User
  include AVD::Validatable

  def initialize(@username : String); end

  # this regex verifies that username contains alphanumeric chars
  # and some special characters (underscore, space and dash).
  @[Assert::Regex(/^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/)]
  property username : String
end
```

---

## class Athena::Console::Question::Choice(T) inherits Athena::Console::Question::AbstractChoice #

**URL:** https://athenaframework.org/Console/Question/Choice/

**Contents:**
- class Athena::Console::Question::Choice(T) inherits Athena::Console::Question::AbstractChoice #
- Constructors#
  - .new(question : String, choices : Hash(String | Int32, T), default : T | Nil = nil)#
  - .new(question : String, choices : Indexable(T), default : Int | T | Nil = nil)#

A question whose answer MUST be within a set of predefined answers. If the user enters an invalid answer, an error is displayed and they are prompted again.

This would display something like the following:

The user would be able to enter the name of the color, or the index associated with it. E.g. blue or 2 for green. If a Hash is used as the choices, the key of each choice is used instead of its index.

Similar to ACON::Question, the third argument can be set to set the default choice. This value can also either be the actual value, or the index/key of the related choice.

Which would display something like :

**Examples:**

Example 1 (swift):
```swift
question = ACON::Question::Choice.new "What is your favorite color?", {"red", "blue", "green"}

helper = self.helper ACON::Helper::Question
color = helper.ask input, output, question
```

Example 2 (json):
```json
What is your favorite color?
 [0] red
 [1] blue
 [2] green
>
```

Example 3 (swift):
```swift
question = ACON::Question::Choice.new "What is your favorite color?", {"c1" => "red", "c2" => "blue", "c3" => "green"}, "c2"

helper = self.helper ACON::Helper::Question
color = helper.ask input, output, question
```

Example 4 (json):
```json
What is your favorite color?
 [c1] red
 [c2] blue
 [c3] green
>
```

---

## annotation Athena::Serializer::Annotations::PreSerialize #

**URL:** https://athenaframework.org/Serializer/Annotations/PreSerialize/

**Contents:**
- annotation Athena::Serializer::Annotations::PreSerialize #
  - Example#

Defines a callback method that is executed directly before the object has been serialized.

**Examples:**

Example 1 (json):
```json
@[ASRA::ExclusionPolicy(:all)]
class Example
  include ASR::Serializable

  def initialize; end

  @[ASRA::Expose]
  @name : String?

  property first_name : String = "Jon"
  property last_name : String = "Snow"

  @[ASRA::PreSerialize]
  private def pre_serialize : Nil
    @name = "#{first_name} #{last_name}"
  end

  @[ASRA::PostSerialize]
  private def post_serialize : Nil
    @name = nil
  end
end

ASR.serializer.serialize Example.new, :json # => {"name":"Jon Snow"}
```

---

## Introduction

**URL:** https://athenaframework.org/ImageSize/

**Contents:**
- Introduction
- Installation#
- Usage#

The Athena::ImageSize component allows measuring the size of various image formats.

First, install the component by adding the following to your shard.yml, then running shards install:

an AIS::Image instance can be instantiated given a path to an image file, or via an IO. From there, information about the image can be accessed off of the instance.

**Examples:**

Example 1 (yaml):
```yaml
dependencies:
  athena-image_size:
    github: athena-framework/image-size
    version: ~> 0.1.0
```

Example 2 (yaml):
```yaml
AIS::Image.from_file_path "spec/images/jpeg/436x429_8_3.jpeg" # =>
# Athena::ImageSize::Image(
# @bits=8,
# @channels=3,
# @format=JPEG,
# @height=429,
# @width=436)
```

---

## struct Athena::Framework::RequestMatcher::Path inherits Struct #

**URL:** https://athenaframework.org/Framework/RequestMatcher/Path/

**Contents:**
- struct Athena::Framework::RequestMatcher::Path inherits Struct #
- Included modules
- Constructors#
  - .new(regex : Regex)#
- Methods#
  - #matches?(request : ATH::Request) : Bool#

Checks if the ATH::Request#path matches the allowed pattern.

Decides whether the rule(s) implemented by the strategy matches the provided request.

---

## abstract struct Athena::Framework::ActionBase inherits Struct #

**URL:** https://athenaframework.org/Framework/ActionBase/

**Contents:**
- abstract struct Athena::Framework::ActionBase inherits Struct #
- Direct known subclasses
- Constructors#
  - .new#
- Methods#
  - #initialize#

Parent type of a controller action just used for typing.

---

## class Athena::Validator::Constraints::EqualTo(ValueType) inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/EqualTo/

**Contents:**
- class Athena::Validator::Constraints::EqualTo(ValueType) inherits Athena::Validator::Constraint #
- Configuration#
  - Required Arguments#
    - value#
  - Optional Arguments#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Included modules

Validates that a value is equal to another.

Defines the value that the value being validated should be compared to.

Type: String Default: This value should be equal to {{ compared_value }}.

The message that will be shown if the value is not equal to the comparison value.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::Constraint#message for this constraint.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class Project
  include AVD::Validatable

  def initialize(@name : String); end

  @[Assert::EqualTo("Athena")]
  property name : String
end
```

---

## abstract class Athena::Console::Output inherits Reference #

**URL:** https://athenaframework.org/Console/Output/

**Contents:**
- abstract class Athena::Console::Output inherits Reference #
- Included modules
- Direct known subclasses
- Constructors#
  - .new(verbosity : ACON::Output::Verbosity | Nil = :normal, decorated : Bool = false, formatter : ACON::Formatter::Interface | Nil = nil)#
- Methods#
  - #decorated=(decorated : Bool) : Nil#
  - #decorated? : Bool#
  - #formatter : ACON::Formatter::Interface#
  - #formatter=(formatter : ACON::Formatter::Interface) : Nil#

Common base implementation of ACON::Output::Interface.

Sets if printed messages should be decorated.

Returns true if printed messages should have their decorations applied. I.e. ACON::Formatter::OutputStyleInterface.

Returns the ACON::Formatter::Interface used by self.

Sets the ACON::Formatter::Interface used by self.

Returns the minimum ACON::Output::Verbosity required for a message to be printed.

Set the minimum ACON::Output::Verbosity required for a message to be printed.

---

## struct Athena::Framework::UploadedFile inherits Athena::Framework::AbstractFile #

**URL:** https://athenaframework.org/Framework/UploadedFile/

**Contents:**
- struct Athena::Framework::UploadedFile inherits Athena::Framework::AbstractFile #
- Methods#
  - #client_mime_type : String#
  - #client_original_extension : String#
  - #client_original_name : String#
  - #client_original_path : String#
  - #error_message : String#
  - #guess_client_extension : String | ::Nil#
  - #move(directory : Path | String, name : String | Nil = nil) : Athena::Framework::File#
  - #status : Athena::Framework::UploadedFile::Status#

Represents a file uploaded to the server. Exposes related information from the client request. See the Getting Started docs for more information.

Returns the file's MIME type as determined by the client. It should not be considered as a safe value.

For a trusted MIME type, use #mime_type (which guesses the MIME type based on the file's contents).

Returns the original extension of the file as determined by the client.

Returns the original name of the file as determined by the client. It should not be considered a safe value to use for a file on your server.

Returns the original full file path as determined by the client. It should not be considered a safe value to use for a file name/path on your server.

If the file was uploaded with the webkitdirectory directive, this will contain the path of the file relative to the uploaded root directory. Otherwise will be identical to #client_original_name.

Returns an informational message as to why the upload failed.

Return value is only valid when the uploaded file's #status is NOT Status::OK.

Returns the extension based on the client MIME type, or nil if the MIME type is unknown. This method uses #client_mime_type, and as such should not be trusted.

For a trusted extension, use #guess_extension which guesses the extension based on the guessed MIME type for the file).

Moves this file to the provided directory, optionally with the provided name. If no name is provided, its current #basename will be used.

Returns the status of this uploaded file.

Returns true if this file was successfully uploaded via HTTP, otherwise returns true.

---

## class Athena::Framework::Response inherits Reference #

**URL:** https://athenaframework.org/Framework/Response/

**Contents:**
- class Athena::Framework::Response inherits Reference #
- Direct known subclasses
- Constructors#
  - .new(content : String | Nil = nil, status : HTTP::Status | Int32 = HTTP::Status::OK, headers : HTTP::Headers | ATH::Response::Headers = ATH::Response::Headers.new)#
- Methods#
  - #charset : String#
  - #charset=(charset : String)#
  - #content : String#
  - #content=(content : String | Nil) : self#
  - #etag : String | ::Nil#

Represents an HTTP response that should be returned to the client.

Contains the content, status, and headers that should be applied to the actual HTTP::Server::Response. This type is used to allow the content, status, and headers to be mutated by ATH::Listeners before being returned to the client.

The #content is written all at once to the server response's IO.

Creates a new response with optional content, status, and headers arguments.

Returns the character set this response is encoded as.

Returns the character set this response is encoded as.

Returns the contents of this response.

Sets the response content.

Returns the value of the etag header if set, otherwise nil.

Returns the response headers of this response.

Returns a Timerepresenting the last-modified header if set, otherwise nil.

Updates the last-modified header to the provided time. Removes the header if time is nil.

Returns true if this response is a redirect, optionally to the provided location. Otherwise, returns false.

Sends self to the client based on the provided context.

How the content gets written can be customized via an ATH::Response::Writer.

Updates the etag header to the provided, optionally weak, etag. Removes the header if etag is nil.

Marks self as "public".

Adds the public cache-control directive and removes the private directive.

Returns the HTTP::Status of this response.

Sets the HTTP::Status of this response.

See ATH::Response::Writer.

---

## class Athena::Framework::RedirectResponse inherits Athena::Framework::Response #

**URL:** https://athenaframework.org/Framework/RedirectResponse/

**Contents:**
- class Athena::Framework::RedirectResponse inherits Athena::Framework::Response #
- Constructors#
  - .new(url : String | Path | URI, status : HTTP::Status | Int32 = HTTP::Status::FOUND, headers : HTTP::Headers | ATH::Response::Headers = ATH::Response::Headers.new)#
- Methods#
  - #url : String#

Represents an HTTP response that does a redirect.

Can be used as an easier way to handle redirects as well as providing type safety that a route should redirect.

Creates a response that should redirect to the provided url with the provided status, defaults to 302.

An ArgumentError is raised if url is blank, or if status is not a valid redirection status code.

The url that the request will be redirected to.

**Examples:**

Example 1 (php):
```php
require "athena"

class RedirectController < ATH::Controller
  @[ARTA::Get(path: "/go_to_crystal")]
  def redirect_to_crystal : ATH::RedirectResponse
    ATH::RedirectResponse.new "https://crystal-lang.org"
  end
end

ATH.run

# GET /go_to_crystal # => (redirected to https://crystal-lang.org)
```

---

## struct Athena::Framework::Listeners::Format inherits Struct #

**URL:** https://athenaframework.org/Framework/Listeners/Format/

**Contents:**
- struct Athena::Framework::Listeners::Format inherits Struct #
- Constructors#
  - .new(format_negotiator : ATH::View::FormatNegotiator)#
- Methods#
  - #on_request(event : ATH::Events::Request) : Nil#

Attempts to determine the best format for the current request based on its Accept HTTP header and the format priority configuration.

ATH::Request::FORMATS is used to determine the related format from the request's MIME type.

See the Getting Started docs for more information.

---

## module Athena::Dotenv::Exception #

**URL:** https://athenaframework.org/Dotenv/Exception/

**Contents:**
- module Athena::Dotenv::Exception #
- Direct including types

Both acts as a namespace for exceptions related to the Athena::Dotenv component, as well as a way to check for exceptions from the component.

---

## class Athena::MIME::Header::Mailbox inherits Athena::MIME::Header::Abstract #

**URL:** https://athenaframework.org/MIME/Header/Mailbox/

**Contents:**
- class Athena::MIME::Header::Mailbox inherits Athena::MIME::Header::Abstract #
- Constructors#
  - .new(name : String, value : AMIME::Address)#
- Methods#
  - #body : AMIME::Address#
  - #body=(body : AMIME::Address)#

Represents a Mailbox MIME Header for something like sender (one named address).

Returns the body of this header.

Sets the body of this header.

---

## struct Athena::EventDispatcher::Callable::EventListenerInstance(I, E) inherits Athena::EventDispatcher::Callable #

**URL:** https://athenaframework.org/EventDispatcher/Callable/EventListenerInstance/

**Contents:**
- struct Athena::EventDispatcher::Callable::EventListenerInstance(I, E) inherits Athena::EventDispatcher::Callable #
- Constructors#
  - .new(callback : Proc(E, Nil) | Proc(E, AED::EventDispatcherInterface, Nil), instance : I, priority : Int32 = 0, name : String | Nil = nil, event_class : E.class = E)#
- Methods#
  - #instance : I#

Represents a dedicated type based listener using AEDA::AsEventListener annotations.

Returns the listener instance this callable is associated with.

---

## class Athena::Framework::Exception::Unauthorized inherits Athena::Framework::Exception::HTTPException #

**URL:** https://athenaframework.org/Framework/Exception/Unauthorized/

**Contents:**
- class Athena::Framework::Exception::Unauthorized inherits Athena::Framework::Exception::HTTPException #
- Constructors#
  - .new(message : String, challenge : String, cause : ::Exception | Nil = nil, headers : HTTP::Headers = HTTP::Headers.new)#

See Athena::Framework::Exception::HTTPException#new.

Includes a www-authenticate header with the provided challenge.

---

## module Athena::Console::Completion #

**URL:** https://athenaframework.org/Console/Completion/

**Contents:**
- module Athena::Console::Completion #

Includes types related to Athena's tab completion features.

---

## annotation Athena::Framework::Annotations::MapQueryParameter #

**URL:** https://athenaframework.org/Framework/Annotations/MapQueryParameter/

**Contents:**
- annotation Athena::Framework::Annotations::MapQueryParameter #

Enables the ATHR::QueryParameter resolver for the parameter this annotation is applied to. See the related resolver documentation for more information.

---

## Introduction

**URL:** https://athenaframework.org/DependencyInjection/

**Contents:**
- Introduction
- Installation#
- Usage#

The Athena::DependencyInjection component provides a robust dependency injection service container framework. Some of the reasoning for how this can/would be useful is called out in the Why Athena? page.

First, install the component by adding the following to your shard.yml, then running shards install:

A special class called the ADI::ServiceContainer (SC) stores useful objects, aka services, that can be shared throughout the project. The SC is lazily initialized on fibers; this allows the SC to be accessed anywhere within the project. The ADI.container method will return the SC for the current fiber.

If you are a user of a project/framework making use of this component, checkout ADI::Register as most of all the information you need is documented there.

Otherwise, if you are the creator/maintainer of a project wishing to integrate this component, the best way to integrate/use this component depends on the execution flow of your application, and how it uses Fibers. Since each fiber has its own container instance, if your application only uses Crystal's main fiber and is short lived, then you most likely only need to set up your services and expose one of them as public to serve as the entry point.

If your application is meant to be long lived, such as using a HTTP::Server, then you will want to ensure that each fiber is truly independent from one another, with them not being reused or sharing state external to the container. An example of this is how HTTP::Server reuses fibers for connection: keep-alive requests. Because of this, or in cases similar to, you may want to manually reset the container via Fiber.current.container = ADI::ServiceContainer.new.

**Examples:**

Example 1 (yaml):
```yaml
dependencies:
  athena-dependency_injection:
    github: athena-framework/dependency-injection
    version: ~> 0.4.0
```

---

## class Athena::Console::Input::StringLine inherits Athena::Console::Input::ARGV #

**URL:** https://athenaframework.org/Console/Input/StringLine/

**Contents:**
- class Athena::Console::Input::StringLine inherits Athena::Console::Input::ARGV #
- Constructors#
  - .new(input : String)#

An ACON::Input::Interface based on a command line string.

---

## struct Athena::DependencyInjection::Proxy(O) inherits Struct #

**URL:** https://athenaframework.org/DependencyInjection/Proxy/

**Contents:**
- struct Athena::DependencyInjection::Proxy(O) inherits Struct #
- Constructors#
  - .new(service_id : String, loader : Proc(O))#
- Methods#
  - #instance : O#
  - #instantiated? : Bool#
  - #service_id : String#
  - #service_type : O.class#
- Macros#
  - method_missing(call)#

Represents a lazily initialized service. See the "Service Proxies" section within ADI::Register.

Returns proxied service O; instantiating it if it has not already been.

Returns whether the proxied service has been instantiated yet.

Returns the service ID (name) of the proxied service.

Returns the type of the proxied service.

---

## class Athena::Validator::Constraints::Email inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/Email/

**Contents:**
- class Athena::Validator::Constraints::Email inherits Athena::Validator::Constraint #
- Configuration#
  - Optional Arguments#
    - mode#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Constants#
  - INVALID_FORMAT_ERROR = "ad9d877d-9ad1-4dd7-b77b-e419934e5910"#

Validates that a value is a valid email address. The underlying value is converted to a string via #to_s before being validated.

As with most other constraints, nil and empty strings are considered valid values, in order to allow the value to be optional. If the value is required, consider combining this constraint with AVD::Constraints::NotBlank.

Type: AVD::Constraints::Email::Mode Default: AVD::Constraints::Email::Mode::HTML5

Defines the pattern that should be used to validate the email address.

Type: String Default: This value is not a valid email address.

The message that will be shown if the value is not a valid email address.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class User
  include AVD::Validatable

  def initialize(@email : String); end

  @[Assert::Email]
  property email : String
end
```

---

## API

**URL:** https://athenaframework.org/Contracts/aliases/

**Contents:**
- API
- alias ACTR #
  - Alias definition

Convenience alias to make referencing Athena::Contracts types easier.

---

## struct Athena::MIME::Encoder::QuotedPrintableContent inherits Struct #

**URL:** https://athenaframework.org/MIME/Encoder/QuotedPrintableContent/

**Contents:**
- struct Athena::MIME::Encoder::QuotedPrintableContent inherits Struct #
- Included modules
- Constructors#
  - .new#
- Class methods#
  - .quoted_printable_encode(string : String) : String#
- Methods#
  - #encode(input : String, charset : String | Nil = "UTF-8", first_line_offset : Int32 = 0, max_line_length : Int32 | Nil = nil) : String#
  - #encode(input : IO, max_line_length : Int32 | Nil = nil) : String#
  - #initialize#

A content encoder based on the quoted-printable spec.

Encodes a string as per https://datatracker.ietf.org/doc/html/rfc2045#section-6.7.

ameba:disable Metrics/CyclomaticComplexity:

Returns an encoded version of the provided input.

first_line_offset may optionally be used depending on the exact implementation if the first line needs to be shorter. max_line_length may optionally be used depending on the exact implementation to customize the max length of each line.

Returns an string representing the encoded contents of the provided input IO. With lines optionally limited to max_line_length, depending on the underlying implementation.

Returns the name of this encoder for use within the content-transfer-encoding header.

---

## class Athena::MIME::Message inherits Reference #

**URL:** https://athenaframework.org/MIME/Message/

**Contents:**
- class Athena::MIME::Message inherits Reference #
- Direct known subclasses
- Constructors#
  - .new(headers : AMIME::Header::Collection | Nil = nil, body : AMIME::Part::Abstract | Nil = nil)#
- Methods#
  - #body : AMIME::Part::Abstract | ::Nil#
  - #body=(body : AMIME::Part::Abstract | Nil)#
  - #ensure_validity! : Nil#
  - #generate_message_id : String#
  - #headers : AMIME::Header::Collection#

Provides a low-level API for creating an email.

See Creating Raw Email Message for more information.

Represents the AMIME::Parts that comprise this message.

Represents the AMIME::Parts that comprise this message.

Asserts that this message is in a valid state to be sent, raising an AMIME::Exception::Logic error if not.

Returns a string that uniquely represents this message.

Represents the AMIME::Headers a part of this message.

Represents the AMIME::Headers a part of this message.

Returns a cloned AMIME::Header::Collection consisting of a final representation of the headers associated with this message. I.e. Ensures the message's headers include the required ones.

---

## module Athena::MIME::Encoder #

**URL:** https://athenaframework.org/MIME/Encoder/

**Contents:**
- module Athena::MIME::Encoder #

Namespace for types related to encoding part of the MIME message.

---

## class Athena::Console::Helper::Question inherits Athena::Console::Helper #

**URL:** https://athenaframework.org/Console/Helper/Question/

**Contents:**
- class Athena::Console::Helper::Question inherits Athena::Console::Helper #
- Direct known subclasses
- Class methods#
  - .disable_stty : Nil#
- Methods#
  - #ask(input : ACON::Input::Interface, output : ACON::Output::Interface, question : ACON::Question::Base)#

Provides a method to ask the user for more information; such as to confirm an action, or to provide additional values.

See ACON::Question namespace for more information.

---

## module Athena::Console::Input::Interface #

**URL:** https://athenaframework.org/Console/Input/Interface/

**Contents:**
- module Athena::Console::Input::Interface #
  - Argument/Option Value Completion#
- Direct including types
- Methods#
  - abstract #argument(name : String, type : T.class) forall T#
  - abstract #argument(name : String) : String | Nil#
  - abstract #arguments : ::Hash#
  - abstract #bind(definition : ACON::Input::Definition) : Nil#
  - abstract #first_argument : String | ::Nil#
  - abstract #has_argument?(name : String) : Bool#

Athena::Console uses a dedicated interface for representing an input source. This allows it to have multiple more specialized implementations as opposed to being tightly coupled to STDIN or a raw IO. This interface represents the methods that must be implemented, however implementations can add additional functionality.

All input sources follow the docopt standard, used by many CLI utility tools. Documentation on this type covers functionality/logic common to all inputs. See each type for more specific information.

Option and argument values can be accessed via ACON::Input::Interface#option and ACON::Input::Interface#argument respectively. There are two overloads, the first accepting just the name of the option/argument as a String, returning the raw value as a String?, with arrays being represented as a comma separated list. The other two overloads accept a T.class representing the desired type the value should be parsed as. For example, given a command with two required and one array arguments:

Assuming the invocation is ./console test false 10 3.14 172.0 123.7777, the values could then be accessed like:

The latter syntax is preferred since it correctly types the value. If a provided value cannot be converted to the expected type, an ACON::Exception::Logic exception will be raised. E.g. '123' is not a valid 'Bool'..

Argument/option modes can be combined. E.g.ACON::Input::Argument::Mode[:required, :is_array] for a required array argument.

There are a lot of possible combinations in regards to what options are defined versus those are provided. To better illustrate how these cases are handled, let's look at an example of a command with three ACON::Input::Options:

The value of foo will either be true if provided, otherwise false; this is the default behavior of ACON::Input::Options. The bar (b) option is required to have a value. A value can be separated from the option's long name by either a space or = or by its short name by an optional space. Finally, the baz (z) option's value is optional.

This table shows how the value of each option based on the provided input:

Things get a bit trickier when an optional ACON::Input::Argument:

In some cases you may need to use the special -- option in order to denote later values should be parsed as arguments, not as a value to an option:

If the completion script is installed, command and option names will be auto completed by the shell. However, value completion may also be implemented in custom commands by providing the suggested values for a particular option/argument.

Additionally, a block version of ACON::Command#argument(name,mode,description,default,&) and ACON::Command#option(name,shortcut,value_mode,description,default,&) may be used if more complex logic is required.

The shell completion script is able to handle huge amounts of suggestions and will automatically filter the values based on existing input from the user. You do not have to implement any filter logic in the command. input.completion_value can still be used to filter if it helps with performance, such as reducing amount of rows the DB returns.

Returns the value of the argument with the provided name converted to the desired type. This method is preferred over #argument since it provides better typing.

Raises an ACON::Exception::Logic if the actual argument value could not be converted to a type.

Returns the raw string value of the argument with the provided name, or nil if is optional and was not provided.

Returns a ::Hash representing the keys and values of the parsed arguments of self.

Binds the provided definition to self. Essentially provides what should be parsed from self.

Returns the first argument from the raw un-parsed input. Mainly used to get the command that should be executed.

Returns true if self has an argument with the provided name, otherwise false.

Returns true if self has an option with the provided name, otherwise false.

Returns true if the raw un-parsed input contains one of the provided values.

This method is to be used to introspect the input parameters before they have been validated. It must be used carefully. It does not necessarily return the correct result for short options when multiple flags are combined in the same option.

If only_params is true, only real parameters are checked. I.e. skipping those that come after the -- option.

Sets if self is #interactive?.

Returns true if self represents an interactive input, such as a TTY.

Returns the value of the option with the provided name converted to the desired type. This method is preferred over #option since it provides better typing.

Raises an ACON::Exception::Logic if the actual option value could not be converted to a type.

Returns the raw string value of the option with the provided name, or nil if is optional and was not provided.

Returns a ::Hash representing the keys and values of the parsed options of self.

Returns the value of a raw un-parsed parameter for the provided value..

This method is to be used to introspect the input parameters before they have been validated. It must be used carefully. It does not necessarily return the correct result for short options when multiple flags are combined in the same option.

If only_params is true, only real parameters are checked. I.e. skipping those that come after the -- option.

Sets the value of the argument with the provided name.

Sets the value of the option with the provided name.

Returns a string representation of the args passed to the command.

Validates the input, asserting all of the required parameters are provided. Raises ACON::Exception::Runtime when not enough arguments are given.

**Examples:**

Example 1 (swift):
```swift
protected def configure : Nil
  self
    .argument("bool", :required)
    .argument("int", :required)
    .argument("floats", :is_array)
end
```

Example 2 (julia):
```julia
protected def execute(input : ACON::Input::Interface, output : ACON::Output::Interface) : ACON::Command::Status
  input.argument "bool"       # => "false" : String
  input.argument "bool", Bool # => false : Bool
  input.argument "int", Int8  # => 10 : Int8

  input.argument "floats"                 # => "3.14,172.0,123.7777" : String
  input.argument "floats", Array(Float64) # => [3.14, 172.0, 123.7777] : Array(Float64)

  ACON::Command::Status::SUCCESS
end
```

Example 3 (swift):
```swift
protected def configure : Nil
  self
    .option("foo", "f")
    .option("bar", "b", :required)
    .option("baz", "z", :optional)
end
```

Example 4 (swift):
```swift
protected def configure : Nil
  self
    .option("foo", "f")
    .option("bar", "b", :required)
    .option("baz", "z", :optional)
    .argument("arg", :optional)
end
```

---

## class Athena::Validator::Constraints::Negative inherits Athena::Validator::Constraints::LessThan #

**URL:** https://athenaframework.org/Validator/Constraints/Negative/

**Contents:**
- class Athena::Validator::Constraints::Negative inherits Athena::Validator::Constraints::LessThan #
- Configuration#
  - Optional Arguments#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Constructors#
  - .new(message : String = "This value should be negative.", groups : Array(String) | String | Nil = nil, payload : Hash(String, String) | Nil = nil)#
- Methods#

Validates that a value is a negative number. Use AVD::Constraints::NegativeOrZero if you wish to also allow 0.

Type: String Default: This value should be negative.

The message that will be shown if the value is not less than 0.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

**Examples:**

Example 1 (python):
```python
class Mall
  include AVD::Validatable

  def initialize(@lowest_floor : Number); end

  @[Assert::Negative]
  property lowest_floor : Number
end
```

---

## Aliases

**URL:** https://athenaframework.org/MIME/aliases/

**Contents:**
- Aliases
- alias AMIME #
  - Alias definition

Convenience alias to make referencing Athena::MIME types easier.

---

## struct Athena::Validator::Violation::ConstraintViolation inherits Struct #

**URL:** https://athenaframework.org/Validator/Violation/ConstraintViolation/

**Contents:**
- struct Athena::Validator::Violation::ConstraintViolation inherits Struct #
- Included modules
- Constructors#
  - .new(message : String, message_template : String | Nil, parameters : Hash(String, String), root : _, property_path : String, invalid_value_container : AVD::Container, plural : Int32 | Nil = nil, code : String | Nil = nil, constraint : AVD::Constraint | Nil = nil, cause : String | Nil = nil)#
- Methods#
  - #==(other : AVD::Violation::ConstraintViolationInterface) : Bool#
  - #cause : String | ::Nil#
  - #code : String | ::Nil#
  - #constraint : AVD::Constraint#
  - #constraint? : AVD::Constraint | ::Nil#

Basic implementation of AVD::Violation::ConstraintViolationInterface.

Returns true if other is the same as self, otherwise false.

Returns the cause of the violation.

Returns a unique machine readable error code representing self. All constraints of a specific "type" should have the same code.

Returns the AVD::Constraint whose validation caused the violation, if any.

Returns the value that caused the violation.

Returns the violation message.

Returns the raw violation message.

The message template contains placeholders for the parameters returned via #parameters.

Returns the parameters used to render the #message_template.

Returns a number used to pluralize the violation message.

The returned value is used to determine the right plurlaization form.

Returns the path from the root element to the violation.

Returns the element originally passed to the validator.

Returns a JSON representation of self.

Returns a string representation of self.

---

## class Athena::Validator::Constraints::GreaterThan(ValueType) inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/GreaterThan/

**Contents:**
- class Athena::Validator::Constraints::GreaterThan(ValueType) inherits Athena::Validator::Constraint #
- Configuration#
  - Required Arguments#
    - value#
  - Optional Arguments#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Included modules

Validates that a value is greater than another.

Type: Number | String | Time

Defines the value that the value being validated should be compared to.

Type: String Default: This value should be greater than {{ compared_value }}.

The message that will be shown if the value is not greater than the comparison value.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::Constraint#message for this constraint.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class Person
  include AVD::Validatable

  def initialize(@age : Int64); end

  @[Assert::GreaterThan(18)]
  property age : Int64
end
```

---

## module Athena::EventDispatcher::Spec #

**URL:** https://athenaframework.org/EventDispatcher/Spec/

**Contents:**
- module Athena::EventDispatcher::Spec #
    - Getting Started#

A set of testing utilities/types to aid in testing Athena::EventDispatcher related types.

Require this module in your spec_helper.cr file.

**Examples:**

Example 1 (markdown):
```markdown
# This also requires "spec".
require "athena-event_dispatcher/spec"
```

---

## struct Athena::Framework::Controller::ValueResolvers::Enum inherits Struct #

**URL:** https://athenaframework.org/Framework/Controller/ValueResolvers/Enum/

**Contents:**
- struct Athena::Framework::Controller::ValueResolvers::Enum inherits Struct #
- Included modules
- Constructors#
  - .new#
- Methods#
  - #initialize#
  - #resolve(request : ATH::Request, parameter : ATH::Controller::ParameterMetadata)#

Handles resolving an Enum member from a string value that is stored in the request's ATH::Request#attributes. This resolver supports both numeric and string based parsing, returning a proper error response if the provided value does not map to any valid member.

Checkout ART::Requirement::Enum for an easy way to restrict routing to an enum's members, or a subset of them.

Returns a value resolved from the provided request and parameter if possible, otherwise returns nil if no parameter could be resolved.

**Examples:**

Example 1 (php):
```php
require "athena"

enum Color
  Red
  Blue
  Green
end

class ExampleController < ATH::Controller
  @[ARTA::Get("/numeric/{color}")]
  def get_color_numeric(color : Color) : Color
    color
  end

  @[ARTA::Get("/string/{color}")]
  def get_color_string(color : Color) : Color
    color
  end
end

ATH.run

# GET /numeric/1 # => "blue"
# GET /string/red # => "red"
```

---

## class Athena::Console::Style::Athena inherits Athena::Console::Style::Output #

**URL:** https://athenaframework.org/Console/Style/Athena/

**Contents:**
- class Athena::Console::Style::Athena inherits Athena::Console::Style::Output #
- Constructors#
  - .new(input : ACON::Input::Interface, output : ACON::Output::Interface)#
- Methods#
  - #ask(question : String, default : String | Nil)#
  - #ask(question : ACON::Question::Base)#
  - #ask_hidden(question : String)#
  - #block(messages : String | Enumerable(String), type : String | Nil = nil, style : String | Nil = nil, prefix : String = " ", padding : Bool = false, escape : Bool = true) : Nil#
  - #caution(messages : String | Enumerable(String)) : Nil#
  - #choice(question : String, choices : Indexable | Hash, default = nil)#

Default implementation of ACON::Style::Interface that provides a slew of helpful methods for formatting output.

Uses ACON::Helper::AthenaQuestion to improve the appearance of questions.

Helper method for asking hidden ACON::Question questions.

Helper method for outputting blocks of messages that powers the #caution, #success, #note, etc. methods. It includes various optional parameters that can be used to print customized blocks.

If type is provided, its value will be printed within []. E.g. [TYPE].

If style is provided, each of the messages will be printed in that style.

prefix represents what each of the messages should be prefixed with.

If padding is true, empty lines will be added before/after the block.

If escape is true, each of the messages will be escaped via ACON::Formatter::Output.escape.

White text on a 3 line red background block with an empty line above/below the block.

Helper method for asking ACON::Question::Choice questions.

White text with one empty line above/below the message(s).

Helper method for asking ACON::Question::Confirmation questions.

Creates and returns an ACON::Helper::ProgressBar, optionally with the provided max amount of steps.

Creates and returns an Athena styled ACON::Helper::Table instance.

Formats a list of key/value pairs horizontally.

Mappable when/if https://github.com/crystal-lang/crystal/issues/10886 is implemented.

White text on a 3 line red background block with an empty line above/below the block.

Returns a new instance of self that outputs to the error output.

Sames as #table, but horizontal

Green text with two empty lines above/below the message(s).

Formats and prints a bulleted list containing the provided elements.

White text with one empty line above/below the list.

White text with one empty line above/below the list.

Green text with one empty line above/below the message(s).

Advances the internal ACON::Helper::ProgressBar by the provided amount of steps.

Completes the internal ACON::Helper::ProgressBar.

Starts an internal ACON::Helper::ProgressBar, optionally with the provided max amount of steps.

Creates a section header with the provided message.

Orange text with one empty line above/below the section.

Black text on a 3 line green background block with an empty line above/below the block.

Formats and prints a table based on the provided headers and rows, followed by a new line.

Same as #puts but indented one space and an empty line above the message(s).

Formats and prints message as a title.

Orange text with one empty line above/below the title.

Sames as #table, but vertical

Black text on a 3 line orange background block with an empty line above/below the block.

**Examples:**

Example 1 (swift):
```swift
protected def execute(input : ACON::Input::Interface, output : ACON::Output::Interface) : ACON::Command::Status
  style = ACON::Style::Athena.new input, output

  style.title "Some Fancy Title"

  # ...

  ACON::Command::Status::SUCCESS
end
```

Example 2 (swift):
```swift
!
! [CAUTION] Some Message
!
```

Example 3 (swift):
```swift
// Some Message
```

Example 4 (swift):
```swift
[ERROR] Some Message
```

---

## enum Athena::Console::Helper::Table::Alignment #

**URL:** https://athenaframework.org/Console/Helper/Table/Alignment/

**Contents:**
- enum Athena::Console::Helper::Table::Alignment #
- Members#
  - LEFT = 0#
  - RIGHT = 1#
  - CENTER = 2#
- Methods#
  - #center?#
  - #left?#
  - #right?#

Represents how the text within a cell should be aligned.

Aligns the text to the left of the cell.

Aligns the text to the right of the cell.

Centers the text within the cell.

Returns true if this enum value equals CENTER

Returns true if this enum value equals LEFT

Returns true if this enum value equals RIGHT

**Examples:**

Example 1 (yaml):
```yaml
+-----------------+
| Text            |
+-----------------+
```

Example 2 (yaml):
```yaml
+-----------------+
|            Text |
+-----------------+
```

Example 3 (yaml):
```yaml
+-----------------+
|      Text       |
+-----------------+
```

---

## class Athena::Console::Helper::Table::Separator inherits Athena::Console::Helper::Table::Cell #

**URL:** https://athenaframework.org/Console/Helper/Table/Separator/

**Contents:**
- class Athena::Console::Helper::Table::Separator inherits Athena::Console::Helper::Table::Cell #
- Constructors#
  - .new(rowspan : Int32 = 1, colspan : Int32 = 1, style : Table::CellStyle | Nil = nil)#

Represents a line that separates one or more rows.

See the separating rows section for more information.

---

## class Athena::Console::Formatter::Output inherits Reference #

**URL:** https://athenaframework.org/Console/Formatter/Output/

**Contents:**
- class Athena::Console::Formatter::Output inherits Reference #
- Included modules
- Constructors#
  - .new(decorated : Bool = false, styles : Colorize::Mode | Nil = nil)#
- Class methods#
  - .escape(text : String) : String#
  - .escape_trailing_backslash(text : String) : String#
- Methods#
  - #decorated=(decorated : Bool)#
  - #decorated? : Bool#

Default implementation of ACON::Formatter::WrappableInterface.

Returns a new string where the special < characters in the provided text are escaped.

Returns a new string where trailing \ in the provided text is escaped.

Sets if output messages should be decorated.

Returns true if output messages will be decorated, otherwise false.

Formats the provided message according to the stored styles.

Formats the provided message according to the defined styles, wrapping it at the provided width. A width of 0 means no wrapping. ameba:disable Metrics/CyclomaticComplexity

Returns true if self has a style with the provided name, otherwise false.

Assigns the provided style to the provided name.

Returns an ACON::Formatter::OutputStyleInterface with the provided name.

---

## struct Athena::Validator::Violation::ConstraintViolationList inherits Struct #

**URL:** https://athenaframework.org/Validator/Violation/ConstraintViolationList/

**Contents:**
- struct Athena::Validator::Violation::ConstraintViolationList inherits Struct #
- Included modules
- Constructors#
  - .new(violations : Array(AVD::Violation::ConstraintViolationInterface) = [] of AVD::Violation::ConstraintViolationInterface)#
- Methods#
  - #add(violation : AVD::Violation::ConstraintViolationInterface) : Nil#
  - #add(violations : AVD::Violation::ConstraintViolationListInterface) : Nil#
  - #find_by_code(error_code : String) : AVD::Violation::ConstraintViolationListInterface#
  - #has?(index : Int) : Bool#
  - #remove(index : Int) : Nil#

Basic implementation of AVD::Violation::ConstraintViolationListInterface.

Adds the provided violation to self.

Adds each of the provided violations to self.

Returns a new AVD::Violation::ConstraintViolationInterface that consists only of violations with the provided error_code.

Returns true if a violation exists at the provided index, otherwise false.

Returns the violation at the provided index.

Sets the provided violation at the provided index.

Returns the number of elements in this container.

Returns a JSON representation of self.

Returns a string representation of self.

---

## module Athena::Framework::Exception #

**URL:** https://athenaframework.org/Framework/Exception/

**Contents:**
- module Athena::Framework::Exception #
- Direct including types

Exception handling in Athena is similar to exception handling in any Crystal program, with the addition of a new unique exception type, ATH::Exception::HTTPException.

When an exception is raised, Athena emits the ATH::Events::Exception event to allow an opportunity for it to be handled. If the exception goes unhandled, i.e. no listener set an ATH::Response on the event, then the request is finished and the exception is reraised. Otherwise, that response is returned, setting the status and merging the headers on the exceptions if it is an ATH::Exception::HTTPException. See ATH::Listeners::Error and ATH::ErrorRendererInterface for more information on how exceptions are handled by default.

To provide the best response to the client, non ATH::Exception::HTTPException should be rescued and converted into a corresponding ATH::Exception::HTTPException. Custom HTTP errors can also be defined by inheriting from ATH::Exception::HTTPException or a child type. A use case for this could be allowing for additional data/context to be included within the exception that ultimately could be used in a ATH::Events::Exception listener.

---

## module Athena::Framework::Annotations #

**URL:** https://athenaframework.org/Framework/Annotations/

**Contents:**
- module Athena::Framework::Annotations #

Contains all the Athena::Framework based annotations. See each annotation for more information.

---

## struct Athena::Framework::Listeners::Error inherits Struct #

**URL:** https://athenaframework.org/Framework/Listeners/Error/

**Contents:**
- struct Athena::Framework::Listeners::Error inherits Struct #
- Constructors#
  - .new(error_renderer : ATH::ErrorRendererInterface)#
- Methods#
  - #on_exception(event : ATH::Events::Exception) : Nil#

Handles an exception by converting it into an ATH::Response via an ATH::ErrorRendererInterface.

This listener defines a log_exception protected method that determines how the exception gets logged. Non ATH::Exception::HTTPExceptions and server errors are logged as errors. Validation errors (ATH::Exception::UnprocessableEntity) are logged as notice. Everything else is logged as a warning. The method can be redefined if different logic is desired.

**Examples:**

Example 1 (julia):
```julia
struct ATH::Listeners::Error
  # :inherit:
  protected def log_exception(exception : ::Exception, & : -> String) : Nil
    # Don't log anything if an exception is some specific type.
    return if exception.is_a? MyException

    # Exception types could also include modules to act as interfaces to determine their level, E.g. `include NoticeException`.
    if exception.is_a? NoticeException
      Log.notice(exception: exception) { yield }
      return
    end

    # Otherwise fallback to the default implementation.
    previous_def
  end
end
```

---

## module Athena::MIME::Encoder::ContentEncoderInterface #

**URL:** https://athenaframework.org/MIME/Encoder/ContentEncoderInterface/

**Contents:**
- module Athena::MIME::Encoder::ContentEncoderInterface #
- Included modules
- Direct including types
- Methods#
  - abstract #encode(input : IO, max_line_length : Int32 | Nil = nil) : String#
  - abstract #name : String#

A more specialized version of AMIME::Encoder::EncoderInterface used to encode MIME message contents.

Returns an string representing the encoded contents of the provided input IO. With lines optionally limited to max_line_length, depending on the underlying implementation.

Returns the name of this encoder for use within the content-transfer-encoding header.

---

## struct Athena::Framework::RequestMatcher::Method inherits Struct #

**URL:** https://athenaframework.org/Framework/RequestMatcher/Method/

**Contents:**
- struct Athena::Framework::RequestMatcher::Method inherits Struct #
- Included modules
- Constructors#
  - .new(methods : Array(String))#
  - .new(*methods : String)#
- Methods#
  - #matches?(request : ATH::Request) : Bool#

Checks if the ATH::Request#method is allowed.

Decides whether the rule(s) implemented by the strategy matches the provided request.

---

## module Athena::Serializer::ObjectConstructorInterface #

**URL:** https://athenaframework.org/Serializer/ObjectConstructorInterface/

**Contents:**
- module Athena::Serializer::ObjectConstructorInterface #
- Direct including types
- Methods#
  - abstract #construct(navigator : ASR::Navigators::DeserializationNavigatorInterface, properties : Array(PropertyMetadataBase), data : ASR::Any, type)#

Determines how a new object is constructed during deserialization.

By default it is directly instantiated via .new as part of ASR::InstantiateObjectConstructor.

However custom constructors can be defined. A use case could be retrieving the object from the database as part of a PUT request in order to apply the deserialized data onto it. This would allow it to retain the PK, any timestamps, or ASRA::ReadOnly values.

Creates an instance of type and applies the provided properties onto it, with the provided data.

---

## module Athena::Clock::Spec::ClockSensitive #

**URL:** https://athenaframework.org/Clock/Spec/ClockSensitive/

**Contents:**
- module Athena::Clock::Spec::ClockSensitive #
- Methods#
  - #mock_time(now : Time | Bool = true) : ACLK::Interface#
  - #shift(*, years : Int = 0, months : Int = 0, weeks : Int = 0, days : Int = 0, hours : Int = 0, minutes : Int = 0, seconds : Int = 0) : ACLK::Interface#

An Athena::Spec::TestCase mix-in that allows freezing time and restoring the global clock after each test.

Returns clock instance based on the provided now value.

If a Time instance is passed, that value is used. If true, freezes the global clock to the current time. If false, restores the previous global clock.

Returns a new clock instanced with the global clock value shifted by the provided amount of time. Positive values shift into the future, while negative values shift into the past.

**Examples:**

Example 1 (swift):
```swift
struct MonthSensitiveTest < ASPEC::TestCase
  include ACLK::Spec::ClockSensitive

  def test_winter_month : Nil
    clock = self.mock_time Time.utc 2023, 12, 10

    month_sensitive = MonthSensitive.new
    month_sensitive.clock = clock

    month_sensitive.winter_month?.should be_true
  end

  def test_non_winter_month : Nil
    clock = self.mock_time Time.utc 2023, 7, 10

    month_sensitive = MonthSensitive.new
    month_sensitive.clock = clock

    month_sensitive.winter_month?.should be_false
  end
end
```

---

## class Athena::Console::Helper::HelperSet inherits Reference #

**URL:** https://athenaframework.org/Console/Helper/HelperSet/

**Contents:**
- class Athena::Console::Helper::HelperSet inherits Reference #
- Constructors#
  - .new(helpers : Hash(ACON::Helper.class, ACON::Helper::Interface) = Hash(ACON::Helper.class, ACON::Helper::Interface).new)#
  - .new(*helpers : ACON::Helper::Interface) : self#
- Methods#
  - #<<(helper : ACON::Helper::Interface) : Nil#
  - #[](helper_class : T.class) : T forall T#
  - #[]?(helper_class : T.class) : T | Nil forall T#
  - #has?(helper_class : ACON::Helper.class) : Bool#

The container that stores various ACON::Helper::Interface implementations, keyed by their class.

Each application includes a default helper set, but additional ones may be added. See ACON::Application#helper_set.

These helpers can be accessed from within a command via the ACON::Command#helper method.

Adds the provided helper to self.

Returns the helper of the provided helper_class, or raises if it is not defined.

Returns the helper of the provided helper_class, or nil if it is not defined.

Returns true if self has a helper for the provided helper_class, otherwise false.

---

## module Athena::Serializer::Model #

**URL:** https://athenaframework.org/Serializer/Model/

**Contents:**
- module Athena::Serializer::Model #

Used to denote a type that is (de)serializable.

This module can be used to make the compiler happy in some situations, it doesn't do anything on its own. You most likely want to use ASR::Serializable instead.

**Examples:**

Example 1 (julia):
```julia
require "athena-serializer"

abstract struct BaseModel
  # `ASR::Model` is needed here to ensure typings are correct for the deserialization process.
  # Child types should still include `ASR::Serializable`.
  include ASR::Model
end

record ModelOne < BaseModel, id : Int32, name : String do
  include ASR::Serializable
end

record ModelTwo < BaseModel, id : Int32, name : String do
  include ASR::Serializable
end

record Unionable, type : BaseModel.class
```

---

## module Athena::Validator::ExecutionContextInterface #

**URL:** https://athenaframework.org/Validator/ExecutionContextInterface/

**Contents:**
- module Athena::Validator::ExecutionContextInterface #
    - Adding Violations#
      - Building violations#
- Direct including types
- Methods#
  - abstract #add_violation(message : String, code : String, value : _) : Nil#
  - abstract #add_violation(message : String, parameters : Hash(String, String) = {} of String => String) : Nil#
  - abstract #add_violation(message : String, code : String) : Nil#
  - abstract #build_violation(message : String, code : String, value : _) : AVD::Violation::ConstraintViolationBuilderInterface#
  - abstract #build_violation(message : String, parameters : Hash(String, String) = {} of String => String) : AVD::Violation::ConstraintViolationBuilderInterface#

Stores contextual data related to the current validation run.

This includes the violations generated so far, the current constraint, value being validated, etc.

As mentioned in the AVD::ConstraintValidatorInterface documentation, violations are not returned from the AVD::ConstraintValidatorInterface#validate method. Instead they are added to the AVD::ConstraintValidatorInterface#context instance.

The simplest way to do so is via the #add_violation method, which accepts the violation message, and any parameters that should be used to render the message. Additional overloads exist to make adding a value with a specific message, and code, or message, code, and {{ value }} placeholder value easier.

In some cases you may wish to add additional data to the AVD::Violation::ConstraintViolationInterface before adding it to self. To do this, you can also use the #build_violation method, which returns an AVD::Violation::ConstraintViolationBuilderInterface that can be used to construct a violation, with an easier API.

Adds a violation with the provided message, and code, value parameter.

The provided value is added to the violations' parameters as "{{ value }}".

Adds a violation with the provided message, and optionally parameters based on the node currently being validated.

Adds a violation with the provided message and code

Returns an AVD::Violation::ConstraintViolationBuilderInterface with the provided message, and code, and value.

The provided value is added to the violations' parameters as "{{ value }}".

Returns an AVD::Violation::ConstraintViolationBuilderInterface with the provided message.

Can be used to add additional information to the AVD::Violation::ConstraintViolationInterface being adding it to self.

Returns an AVD::Violation::ConstraintViolationBuilderInterface with the provided message, and code.

Returns the class that is currently being validated.

Returns the AVD::Constraint that is currently being validated, if any.

Returns the group that is currently being validated, if any.

Returns an AVD::Metadata::MetadataInterface object for the value currently being validated.

This would be an AVD::Metadata::PropertyMetadataInterface if the current value is an object, an AVD::Metadata::GenericMetadata if the current value is a plain value, and an AVD::Metadata::ClassMetadata if the current value value is an entire class.

Returns the object that is currently being validated.

Returns the property name of the node currently being validated.

Returns the path to the property that is currently being validated.

For example, given a Person object that has an Address property; the property path would be empty initially. When the address property is being validated the property_path would be address. When the street property of the related Address object is being validated the property_path would be address.street.

This also works for collections of objects. If the Person object had multiple addresses, the property path when validating the first street of the first address would be addresses[0].street.

Returns the object initially passed to AVD::Validator::ValidatorInterface#validate.

Returns a reference to an AVD::Validator::ValidatorInterface that can be used to validate additional constraints as part of another constraint.

Returns the value that is currently being validated.

Returns the AVD::Violation::ConstraintViolationInterface instances generated by the validator thus far.

---

## class Athena::Console::Output::IO inherits Athena::Console::Output #

**URL:** https://athenaframework.org/Console/Output/IO/

**Contents:**
- class Athena::Console::Output::IO inherits Athena::Console::Output #
- Direct known subclasses
- Constructors#
  - .new(io : ::IO, verbosity : ACON::Output::Verbosity | Nil = :normal, decorated : Bool | Nil = nil, formatter : ACON::Formatter::Interface | Nil = nil)#
- Methods#
  - #io : ::IO#
  - #io=(io : ::IO)#
  - #to_s(*args, **options)#
  - #to_s#

An ACON::Output::Interface implementation that wraps an IO.

---

## Introduction

**URL:** https://athenaframework.org/MIME/

**Contents:**
- Introduction
- Installation#
- Usage#
  - Creating Raw Email Messages#

The Athena::MIME component allows manipulating the MIME messages used to send emails and provides utilities related to MIME types. Additionally it also exposes MIME guessing and MIME Type <=> file extension translations via the AMIME::Types type.

MIME (Multipurpose Internet Mail Extensions) is an Internet standard that extends the original basic format of emails to support features like:

The entire MIME standard is complex and huge, but this component abstracts all that complexity to provide two ways of creating MIME messages:

First, install the component by adding the following to your shard.yml, then running shards install:

The AMIME::Email class provides fluent setters to allow constructing an email with the desired information:

See the API docs for that type for more information. This component only handles creating the email messages. From here you would need to pass it along to another shard/component to actually send it.

For most use cases, the AMIME::Email type would work just fine. However some applications may require total control over every part of the email.

Consider a message that includes some HTMl and textual content, a single PNG embedded image, and a PDF file attachment. The MIME standard allows constructing this message in different ways, but most commonly would be like:

This is the purpose of each MIME message part:

You must keep all of the above in mind when using the low-level AMIME::Message class to construct an email.

Embedding images and attaching files is possible by creating the appropriate email multi parts:

**Examples:**

Example 1 (yaml):
```yaml
dependencies:
  athena-mime:
    github: athena-framework/mime
    version: ~> 0.2.0
```

Example 2 (swift):
```swift
email = AMIME::Email
  .new
  .from("[email protected]")
  .to("[email protected]")
  .cc("[email protected]")
  .bcc("[email protected]")
  .reply_to("[email protected]")
  .priority(:high)
  .subject("Important Notification")
  .text("Lorem ipsum...")
  .html("<h1>Lorem ipsum</h1> <p>...</p>")
  .attach_from_path("/path/to/file.pdf", "my-attachment.pdf")
  .embed_from_path("/path/to/logo.png")
```

Example 3 (unknown):
```unknown
multipart/mixed
├── multipart/related
│   ├── multipart/alternative
│   │   ├── text/plain
│   │   └── text/html
│   └── image/png
└── application/pdf
```

Example 4 (julia):
```julia
headers = AMIME::Header::Collection
  .new
  .add_mailbox_list_header("from", {"[email protected]"})
  .add_mailbox_list_header("to", {"[email protected]"})
  .add_text_header("subject", "Important Notification")

text_content = AMIME::Part::Text.new "text content"
html_content = AMIME::Part::Text.new "html content", sub_type: "html"
body = AMIME::Part::Multipart::Alternative.new text_content, html_content

email = AMIME::Message.new headers, body
```

---

## annotation Athena::DependencyInjection::AsAlias #

**URL:** https://athenaframework.org/DependencyInjection/AsAlias/

**Contents:**
- annotation Athena::DependencyInjection::AsAlias #
    - Default Service#
    - String Keys#

Allows defining an alternative name to identify a service. This helps solve two primary use cases:

This annotation may be applied to a service that includes one or more interface(s). The annotation can then be provided the interface to alias as the first positional argument. If the service only includes one interface (module ending with Interface), the annotation argument can be omitted. Multiple annotations may be applied if it includes more than one.

In this example, anytime a parameter restriction for SomeInterface is encountered, Foo will be injected. Similarly, anytime a parameter restriction of BlahInterface or OtherInterface is encountered, Bar will be injected. This can be especially useful for when you want to define a default service to use when there are multiple implementations of an interface.

The use case for string keys is you can do something like this:

@[ADI::Register(name: "default_service")] @[ADI::AsAlias("my_service")] class SomeService end The idea being, have a service with an internal default_service id, but alias it to a more general my_service id. Dependencies could then be wired up to depend upon the "@my_service" implementation. This enabled the user/other logic to override the my_service alias to their own implementation (assuming it implements same API/interface(s)). This should allow everything to propagate and use the custom type without having to touch the original default_service.

**Examples:**

Example 1 (julia):
```julia
module SomeInterface; end

module OtherInterface; end

module BlahInterface; end

# `Foo` is implicitly aliased to `SomeInterface` since it only includes the one.
@[ADI::Register]
@[ADI::AsAlias] # SomeInterface is assumed
class Foo
  include SomeInterface
end

# Alias `Bar` to both included interfaces.
@[ADI::Register]
@[ADI::AsAlias(BlahInterface)]
@[ADI::AsAlias(OtherInterface)]
class Bar
  include BlahInterface
  include OtherInterface
end
```

Example 2 (php):
```php
@[ADI::Register(name: "default_service")]
@[ADI::AsAlias("my_service")]
class SomeService
end
```

---

## abstract class Athena::MIME::Header::Abstract(T) inherits Reference #

**URL:** https://athenaframework.org/MIME/Header/Abstract/

**Contents:**
- abstract class Athena::MIME::Header::Abstract(T) inherits Reference #
- Included modules
- Direct known subclasses
- Constructors#
  - .new(name : String)#
- Methods#
  - abstract #body : T#
  - abstract #body=(body : T)#
  - #charset : String#
  - #charset=(charset : String)#

Base type of all headers that provides common utilities and abstractions.

Returns the body of this header.

Sets the body of this header.

Sets the character set used in this header. Defaults to UTF-8.

Sets the character set used in this header. Defaults to UTF-8.

Returns a copy of self with all instance variables cloned.

Sets the language used in this header. E.g. en-us.

Sets the language used in this header. E.g. en-us.

Controls how long each header line may be before needing wrapped. Defaults to 76.

Controls how long each header line may be before needing wrapped. Defaults to 76.

Returns the name of the header.

---

## class Athena::Console::Exception::Logic inherits Exception #

**URL:** https://athenaframework.org/Console/Exception/Logic/

**Contents:**
- class Athena::Console::Exception::Logic inherits Exception #
- Included modules
- Constructors#
  - .new(message : String, code : Int32 = 0, cause : ::Exception | Nil = nil)#

Represents a code logic error that should lead directly to a fix in your code.

---

## module Athena::Framework::Controller::ValueResolvers::Interface #

**URL:** https://athenaframework.org/Framework/Controller/ValueResolvers/Interface/

**Contents:**
- module Athena::Framework::Controller::ValueResolvers::Interface #
  - Configuration#
    - Extra Data#
  - Handling Multiple Types#
    - Free Vars#
    - Strict Typing#
- Direct including types
- Constants#
  - TAG = "athena.controller.value_resolver"#
- Methods#

Value resolvers handle resolving the argument(s) to pass to a controller action based on values stored within the ATH::Request, or some other source.

Custom resolvers can be defined by creating a service that implements this interface, and is tagged with ATHR::Interface::TAG. The tag also accepts an optional priority field the determines the order in which the resolvers execute. The list of built in resolvers and their priorities can be found on the ATH::Controller::ValueResolvers module.

Resolvers that mutate a value already within the ATH::Request#attributes, such as one from a route or query parameter MUST have a priority >100 to ensure the custom logic is applied before the raw value is resolved via the ATHR::RequestAttribute resolver.

The first resolver to return a value wins and no other resolvers will be executed for that particular parameter. The resolver should return nil to denote no value could be resolved, such as if the parameter is of the wrong type, does not have a specific annotation applied, or anything else that can be deduced from either parameter. If no resolver is able to resole a value for a specific parameter, an error is thrown and processing of the request ceases.

Now, given the following controller:

Since none of the built-in resolvers are applicable for this parameter type, nor is there a my_obj value in ATH::Request#attributes, assuming no customer listeners manually add it, the CustomResolver would take over and provide the value for that parameter.

In some cases, the request and parameter themselves may not be enough to know if a resolver should try to resolve a value or not. A naive example would be say you want to have a resolver that multiplies certain Int32 parameters by 10. It wouldn't be enough to just check if the parameter is an Int32 as that leaves too much room for unexpected contexts to be resolved unexpectedly. For such cases a .configuration annotation type may be defined to allow marking the specific parameters the related resolver should apply to.

While this example is quite naive, this pattern is used as part of the ATHR::RequestBody to know if an object should be deserialized from the request body, or is intended be supplied some other way.

Another use case for this pattern is providing extra data on a per parameter basis. For example, say we wanted to allow customizing the multiplier instead of having it hard coded to 10.

In order to do this we can pass properties to the .configuration macro to define what we want to be configurable via the annotation. Next we can then use this value in our resolver, and when applying to a specific parameter:

A more real-world example of this pattern is how the ATHR::Time resolver allows customizing the format and/or location that should be used to parse the datetime string via ATHA::MapTime annotation.

The configuration annotation may be defined in another namespace via prefixing the FQN of the path with ::. E.g. configuration ::MyApp::Annotation::Multiply.

When using an annotation to enable a particular resolver, it may be required to handle parameters of varying types. E.g. it should do one thing when enabled on an Int32 parameter, while a different thing when applied to a String parameter. But both things are related enough to not warrant dedicated resolvers. Because the type of the parameter is stored within a generic type, it can be used to overload the #resolve method based on its type For example:

If more precision is required, a free variable can be used to extract the type of the related parameter such that it can be used to generate the proper code.

An example of this is how ATHR::RequestBody handles both ASR::Serializable and JSON::Serializable types via:

This works well to make the compiler happy when previous methods are not enough.

In all of the examples so far, the resolvers could be applied to any parameter of any type and all of the logic to resolve a value would happen at runtime. In some cases a specific resolver may only support a single, or small subset of types. Such as how the ATHR::RequestBody resolver only allows ASR::Serializable, JSON::Serializable, or URI::Params::Serializable types. In this case, the ATHR::Interface::Typed module may be used to define the allowed parameter types.

Strict typing is ONLY supported when a configuration annotation is used to enable the resolver.

Since MyResolver was defined to only support String types, a compile time error is raised when its annotation is applied to a non String parameter. This feature pairs nicely with the free var section as it essentially allows scoping the possible types of T to the set of types defined as part of the module.

The tag name for ATHR::Interface services.

Returns a value resolved from the provided request and parameter if possible, otherwise returns nil if no parameter could be resolved.

Helper macro around ADI.configuration_annotation that allows defining resolver specific annotations. See the underlying macro and the configuration section for more information.

**Examples:**

Example 1 (julia):
```julia
@[ADI::Register(tags: [{name: ATHR::Interface::TAG, priority: 10}])]
struct CustomResolver
  include ATHR::Interface

  # :inherit:
  def resolve(request : ATH::Request, parameter : ATH::Controller::ParameterMetadata) : MyCustomType?
    # Return early if a value is unresolvable from the current *request* and/or *parameter*.
    return if parameter.type != MyCustomType

    # Return the resolved value. It could either come from the request itself, an injected service, or hard coded.
    MyCustomType.new "foo"
  end
end
```

Example 2 (php):
```php
class ExampleController < ATH::Controller
  @[ARTA::Get("/")]
  def root(my_obj : MyCustomType) : String
    my_obj.name
  end
end

# GET / # => "foo"
```

Example 3 (julia):
```julia
# The priority _MUST_ be `>100` to ensure the value isnt preemptively resolved by the `ATHR::RequestAttribute` resolver.
@[ADI::Register(tags: [{name: ATHR::Interface::TAG, priority: 110}])]
struct Multiply
  include ATHR::Interface

  # The value provided to the macro maps to the name of the annotation.
  configuration Multiply::This

  # :inherit:
  def resolve(request : ATH::Request, parameter : ATH::Controller::ParameterMetadata) : Int32?
    # Return early if the controller action parameter doesn't have the annotation.
    return unless parameter.annotation_configurations.has? This

    # Return early if the parameter type is not `Int32`.
    return if parameter.type != Int32

    request.attributes.get(parameter.name, Int32) * 10
  end
end

class ExampleController < ATH::Controller
  @[ARTA::Get("/{num}")]
  def multiply(
    @[Multiply::This]
    num : Int32,
  ) : Int32
    num
  end
end

ATH.run

# GET /10 # => 100
```

Example 4 (julia):
```julia
# The priority _MUST_ be `>100` to ensure the value isnt preemptively resolved by the `ATHR::RequestAttribute` resolver.
@[ADI::Register(tags: [{name: ATHR::Interface::TAG, priority: 110}])]
struct Multiply
  include ATHR::Interface

  configuration Multiply::This, multiplier : Int32 = 10

  # :inherit:
  def resolve(request : ATH::Request, parameter : ATH::Controller::ParameterMetadata) : Int32?
    # Return early if the controller action parameter doesn't have the annotation.
    return unless (config = parameter.annotation_configurations[This]?)

    # Return early if the parameter type is not `Int32`.
    return if parameter.type != Int32

    request.attributes.get(parameter.name, Int32) * config.multiplier
  end
end

class ExampleController < ATH::Controller
  @[ARTA::Get("/{num}")]
  def multiply(
    @[Multiply::This(multiplier: 50)]
    num : Int32,
  ) : Int32
    num
  end
end

ATH.run

# GET /10 # => 500
```

---

## class Athena::MIME::Header::Path inherits Athena::MIME::Header::Abstract #

**URL:** https://athenaframework.org/MIME/Header/Path/

**Contents:**
- class Athena::MIME::Header::Path inherits Athena::MIME::Header::Abstract #
- Constructors#
  - .new(name : String, value : AMIME::Address)#
- Methods#
  - #body : AMIME::Address#
  - #body=(body : AMIME::Address)#

Represents a Path MIME Header for something like return-path (one address).

Returns the body of this header.

Sets the body of this header.

---

## struct Athena::Framework::ErrorRenderer inherits Struct #

**URL:** https://athenaframework.org/Framework/ErrorRenderer/

**Contents:**
- struct Athena::Framework::ErrorRenderer inherits Struct #
- Included modules
- Constructors#
  - .new(debug : Bool)#
- Methods#
  - #render(exception : ::Exception) : ATH::Response#

The default ATH::ErrorRendererInterface, JSON serializes the exception.

Renders the given exception into an ATH::Response.

---

## struct Athena::MIME::Encoder::Base64Content inherits Struct #

**URL:** https://athenaframework.org/MIME/Encoder/Base64Content/

**Contents:**
- struct Athena::MIME::Encoder::Base64Content inherits Struct #
- Included modules
- Constructors#
  - .new#
- Methods#
  - #encode(input : String, charset : String | Nil = "UTF-8", first_line_offset : Int32 = 0, max_line_length : Int32 | Nil = nil) : String#
  - #encode(input : IO, max_line_length : Int32 | Nil = nil) : String#
  - #initialize#
  - #name : String#

A content encoder based on the Base64 spec.

Returns an encoded version of the provided input.

first_line_offset may optionally be used depending on the exact implementation if the first line needs to be shorter. max_line_length may optionally be used depending on the exact implementation to customize the max length of each line.

Returns an string representing the encoded contents of the provided input IO. With lines optionally limited to max_line_length, depending on the underlying implementation.

Returns the name of this encoder for use within the content-transfer-encoding header.

---

## module Athena::Contracts::EventDispatcher::Interface #

**URL:** https://athenaframework.org/Contracts/EventDispatcher/Interface/

**Contents:**
- module Athena::Contracts::EventDispatcher::Interface #
- Methods#
  - abstract #dispatch(event : ACTR::EventDispatcher::Event) : ACTR::EventDispatcher::Event#

Represents the most basic interface that event dispatchers must implement. Can be further extended to provide additional functionality.

Dispatches the provided event to all listeners listening on that event.

---

## class Athena::Dotenv inherits Reference #

**URL:** https://athenaframework.org/Dotenv/top_level/

**Contents:**
- class Athena::Dotenv inherits Reference #
  - Syntax#
    - Comments#
    - Quotes#
    - Variables#
    - Commands#
  - File Precedence#
  - Production#
- Constants#
  - VERSION = "0.2.1"#

All usage involves using an Athena::Dotenv instance. For example:

require "athena-dotenv" # Create a new instance dotenv = Athena::Dotenv.new # Load a file dotenv.load "./.env" # Load multiple files dotenv.load "./.env", "./.env.dev" # Overrides existing variables dotenv.overload "./.env" # Load all files for the current $APP_ENV # .env, .env.local, and .env.$APP_ENV.local or .env.$APP_ENV dotenv.load_environment "./.env" A Athena::Dotenv::Exception::Path error will be raised if the provided file was not found, or is not readable.

ENV vars should be defined one per line. There should be no space between the = between the var name and its value.

AAthena::Dotenv::Exception::Format error will be raised if a formatting/parsing error is encountered.

Comments can be defined by prefixing them with a # character. Comments can defined on its own line, or inlined after an ENV var definition.

Unquoted values, or those quoted with single (') quotes behave as literals while double (") quotes will have special chars expanded. For example, given the following .env file:

UNQUOTED=FOO\nBAR SINGLE_QUOTES='FOO\nBAR' DOUBLE_QUOTES="FOO\nBAR" require "athena-dotenv" Athena::Dotenv.new.load "./.env" ENV["UNQUOTED"] # => "FOO\\nBAR" ENV["SINGLE_QUOTES"] # => "FOO\\nBAR" ENV["DOUBLE_QUOTES"] # => "FOO\n" + "BAR"

Notice how only the double quotes version actually expands \n into a newline, whereas the others treat it as a literal \n.

Quoted values may also extend over multiple lines:

Both single and double quotes will include the actual newline characters, however only double quotes would expand the extra newline in BAR\n.

ENV vars can be used in values by prefixing the variable name with a $ with optional opening and closing {}.

The order is important when using variables. In the previous example FOO must be defined BAZ which must be defined before BIZ. This also extends to when loading multiple files, where a variable may use the value in another file.

Default values may also be defined in case the related ENV var is not set:

This would set the value of DB_USER to be root, unless DB_USER is defined elsewhere in which case it would use the value of that variable.

Shell commands can be evaluated via $().

Commands are currently not supported on Windows.

The default .env file defines ALL ENV vars used within an application, with sane defaults. This file should be committed and should not contain any sensitive values.

However in some cases you may need to define values to override those in .env, whether that be only for a single machine, or all machines in a specific environment.

For these purposes there are other .env files that are loaded in a specific order to allow for just this use case:

See #load_environment for more information.

Real ENV vars always win against those created in any .env file.

Environment specific .env files should ONLY to override values defined within the default .env file and NOT as a replacement to it. This ensures there is still a single source of truth and removes the need to duplicate everything for each environment.

.env files are mainly intended for non-production environments in order to give the benefits of using ENV vars, but be more convenient/easier to use. They can of course continue to be used in production by distributing the base .env file along with the binary, then creating a .env.local on the production server and including production values within it. This can work quite well for simple applications, but ultimately a more robust solution that best leverages the features of the server the application is running on is best.

Convenience method that loads the file at the provided path, defaulting to .env.

Convenience method that loads one or more .env files, defaulting to .env.

Loads each .env file within the provided paths.

Loads a .env file and its related additional files based on their precedence if they exist.

The current ENV is determined by the value of APP_ENV, which is configurable globally via .new, or for a single load via the env_key parameter. If no environment ENV var is defined, default_environment will be used. The .env.local file will NOT be loaded if the current environment is included within test_environments.

Existing ENV vars may optionally be overridden by passing true to override_existing_vars.

Same as #load, but will override existing ENV vars.

Parses and returns a Hash based on the string contents of the provided data string. The original .env file path may also be provided to path for more meaningful error messages.

Populates the provides values into the environment.

Existing ENV vars may optionally be overridden by passing true to override_existing_vars.

**Examples:**

Example 1 (markdown):
```markdown
require "athena-dotenv"

# Create a new instance
dotenv = Athena::Dotenv.new

# Load a file
dotenv.load "./.env"

# Load multiple files
dotenv.load "./.env", "./.env.dev"

# Overrides existing variables
dotenv.overload "./.env"

# Load all files for the current $APP_ENV
# .env, .env.local, and .env.$APP_ENV.local or .env.$APP_ENV
dotenv.load_environment "./.env"
```

Example 2 (json):
```json
DATABASE_URL=mysql://db_user:[email protected]:3306/db_name
```

Example 3 (markdown):
```markdown
# Single line comment
FOO=BAR

BAR=BAZ # Inline comment
```

Example 4 (unknown):
```unknown
UNQUOTED=FOO\nBAR
SINGLE_QUOTES='FOO\nBAR'
DOUBLE_QUOTES="FOO\nBAR"
```

---

## class Athena::Framework::RequestMatcher inherits Reference #

**URL:** https://athenaframework.org/Framework/RequestMatcher/

**Contents:**
- class Athena::Framework::RequestMatcher inherits Reference #
- Included modules
- Constructors#
  - .new(matchers : Iterable(ATH::RequestMatcher::Interface))#
  - .new(*matchers : ATH::RequestMatcher::Interface)#
- Methods#
  - #matches?(request : ATH::Request) : Bool#

Verifies that all checks match against an ATH::Request instance.

Decides whether the rule(s) implemented by the strategy matches the provided request.

**Examples:**

Example 1 (javascript):
```javascript
matcher = ATH::RequestMatcher.new(
  ATH::RequestMatcher::Path.new(%r(/admin/foo)),
  ATH::RequestMatcher::Method.new("GET"),
)

matcher.matches?(ATH::Request.new "GET", "/admin/foo")  # => true
matcher.matches?(ATH::Request.new "POST", "/admin/foo") # => false
```

---

## module Athena::Validator::Violation::ConstraintViolationInterface #

**URL:** https://athenaframework.org/Validator/Violation/ConstraintViolationInterface/

**Contents:**
- module Athena::Validator::Violation::ConstraintViolationInterface #
- Direct including types
- Methods#
  - abstract #cause : String | ::Nil#
  - abstract #code : String | ::Nil#
  - abstract #constraint : AVD::Constraint | ::Nil#
  - abstract #invalid_value#
  - abstract #message : String#
  - abstract #message_template : String | ::Nil#
  - abstract #parameters : Hash(String, String)#

Represents a violation of a constraint during validation.

Each failed constraint that fails during validation; one or more violations are created. The violations store the violation message, the path to the failing element, and the root element originally passed to the validator.

Returns the cause of the violation.

Returns a unique machine readable error code representing self. All constraints of a specific "type" should have the same code.

Returns the AVD::Constraint whose validation caused the violation, if any.

Returns the value that caused the violation.

Returns the violation message.

Returns the raw violation message.

The message template contains placeholders for the parameters returned via #parameters.

Returns the parameters used to render the #message_template.

Returns a number used to pluralize the violation message.

The returned value is used to determine the right plurlaization form.

Returns the path from the root element to the violation.

Returns the element originally passed to the validator.

Returns a JSON representation of self.

Returns a string representation of self.

---

## struct Athena::Console::Spec::CommandTester inherits Struct #

**URL:** https://athenaframework.org/Console/Spec/CommandTester/

**Contents:**
- struct Athena::Console::Spec::CommandTester inherits Struct #
    - Commands with User Input#
- Included modules
- Constructors#
  - .new(command : ACON::Command)#
- Methods#
  - #execute(input : Hash(String, _) = Hash(String, String).new, *, decorated : Bool = false, interactive : Bool | Nil = nil, capture_stderr_separately : Bool = false, verbosity : ACON::Output::Verbosity | Nil = nil) : ACON::Command::Status#
  - #execute(decorated : Bool = false, interactive : Bool | Nil = nil, capture_stderr_separately : Bool = false, verbosity : ACON::Output::Verbosity | Nil = nil, **input : _)#
  - #input : ACON::Input::Interface#
  - #input? : ACON::Input::Interface | ::Nil#

Allows testing the logic of an ACON::Command, without needing to create and run a binary.

Say we have the following command:

We can use ACON::Spec::CommandTester to assert it is working as expected.

A command that are asking ACON::Questions can also be tested:

Because we are not in the context of an ACON::Application, we need to manually set the ACON::Helper::HelperSet in order to make the command aware of ACON::Helper::Question. After that we can use the ACON::Spec::Tester#inputs method to set the inputs our test should use when prompted.

Multiple inputs can be provided if there are multiple questions being asked.

Executes the command, with the provided input being passed to the command.

Custom values for decorated, interactive, and verbosity can also be provided and will be forwarded to their respective types. capture_stderr_separately makes it so output to STDERR is captured separately, in case you wanted to test error output. Otherwise both error and normal output are captured via ACON::Spec::Tester#display.

Executes the command, with the provided input being passed to the command.

Custom values for decorated, interactive, and verbosity can also be provided and will be forwarded to their respective types. capture_stderr_separately makes it so output to STDERR is captured separately, in case you wanted to test error output. Otherwise both error and normal output are captured via ACON::Spec::Tester#display.

Returns the ACON::Input::Interface being used by the tester.

Returns the ACON::Input::Interface being used by the tester.

Returns the ACON::Command::Status of the command execution, or nil if it has not yet been executed.

**Examples:**

Example 1 (php):
```php
@[ACONA::AsCommand("add", description: "Sums two numbers, optionally making making the sum negative")]
class AddCommand < ACON::Command
  protected def configure : Nil
    self
      .argument("value1", :required, "The first value")
      .argument("value2", :required, "The second value")
      .option("negative", description: "If the sum should be made negative")
  end

  protected def execute(input : ACON::Input::Interface, output : ACON::Output::Interface) : ACON::Command::Status
    sum = input.argument("value1", Int32) + input.argument("value2", Int32)

    sum = -sum if input.option "negative", Bool

    output.puts "The sum of values is: #{sum}"

    ACON::Command::Status::SUCCESS
  end
end
```

Example 2 (julia):
```julia
require "spec"
require "athena-spec"

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

Example 3 (swift):
```swift
@[ACONA::AsCommand("question")]
class QuestionCommand < ACON::Command
  protected def execute(input : ACON::Input::Interface, output : ACON::Output::Interface) : ACON::Command::Status
    helper = self.helper ACON::Helper::Question

    question = ACON::Question(String).new "What is your name?", "None"
    output.puts "Your name is: #{helper.ask input, output, question}"

    ACON::Command::Status::SUCCESS
  end
end
```

Example 4 (julia):
```julia
require "spec"
require "./src/spec"

describe QuestionCommand do
  describe "#execute" do
    it do
      command = QuestionCommand.new
      command.helper_set = ACON::Helper::HelperSet.new ACON::Helper::Question.new
      tester = ACON::Spec::CommandTester.new command
      tester.inputs "Jim"
      tester.execute
      tester.display.should eq "What is your name?Your name is: Jim\n"
    end
  end
end
```

---

## module Athena::Console::Formatter::WrappableInterface #

**URL:** https://athenaframework.org/Console/Formatter/WrappableInterface/

**Contents:**
- module Athena::Console::Formatter::WrappableInterface #
- Included modules
- Direct including types
- Methods#
  - abstract #format_and_wrap(message : String | Nil, width : Int32) : String#

Extension of ACON::Formatter::Interface that supports word wrapping.

Formats the provided message according to the defined styles, wrapping it at the provided width. A width of 0 means no wrapping.

---

## class Athena::MIME::Header::Collection inherits Reference #

**URL:** https://athenaframework.org/MIME/Header/Collection/

**Contents:**
- class Athena::MIME::Header::Collection inherits Reference #
- Constructors#
  - .new(headers : Enumerable(AMIME::Header::Interface) = [] of AMIME::Header::Interface)#
  - .new(*headers : AMIME::Header::Interface)#
- Class methods#
  - .check_header_class(header : AMIME::Header::Interface) : Nil#
  - .unique_header?(name : String) : Bool#
- Methods#
  - #<<(header : AMIME::Header::Interface) : self#
  - #==(other : self)#

Represents a collection of MIME headers.

Checks the provided header to ensure its name and type are compatible.

ameba:disable Metrics/CyclomaticComplexity:

Returns true if the provided header name is required to be unique.

Adds the provided header to the collection.

Returns true if this reference is the same as other. Invokes same?.

Returns the first header with the provided name casted to type T. Raises an AMIME::Exception::HeaderNotFound exception if no header with that name exists.

Returns the first header with the provided name. Raises an AMIME::Exception::HeaderNotFound exception if no header with that name exists.

Returns the first header with the provided name casted to type T, or nil if no headers with that name exist.

Returns the first header with the provided name, or nil if no headers with that name exist.

Adds an AMIME::Header::Date header to the collection with the provided name and body.

Adds an AMIME::Header::Identification header to the collection with the provided name and body.

Adds an AMIME::Header::Mailbox header to the collection with the provided name and body.

Adds an AMIME::Header::MailboxList header to the collection with the provided name and body.

Adds an AMIME::Header::Parameterized header to the collection with the provided name and body.

Adds an AMIME::Header::Path header to the collection with the provided name and body.

Adds an AMIME::Header::Unstructured header to the collection with the provided name and body.

Returns an array of all AMIME::Header::Interface instances stored within the collection.

Yields each AMIME::Header::Interface instance stored within the collection with the provided name.

Yields each AMIME::Header::Interface instance stored within the collection.

Returns a copy of self with all instance variables cloned.

Removes the header(s) with the provided name from the collection.

Returns true if the collection contains a header with the provided name, otherwise false.

Returns the body of the first header with the provided name.

Returns the value of the provided parameter for the first AMIME::Header::Parameterized header with the provided name.

Sets the max line length to use for this collection.

Returns the names of all headers stored within the collection as an array of strings.

Returns the string representation of each header in the collection as an array of strings.

**Examples:**

Example 1 (yaml):
```yaml
AMIME::Header::Collection.check_header_class AMIME::Header::Date.new("date", Time.utc) # => nil
AMIME::Header::Collection.check_header_class AMIME::Header::Unstructured.new("date", "blah")
# => AMIME::Exception::Logic: The 'date' header must be an instance of 'Athena::MIME::Header::Date' (got 'Athena::MIME::Header::Unstructured').
```

Example 2 (javascript):
```javascript
headers = AMIME::Header::Collection.new
headers.add_parameterized_header "content-type", "text/plain", {"charset" => "UTF-8"}
headers.header_parameter "content-type", "charset" # => "UTF-8"
```

---

## class Athena::Clock inherits Reference #

**URL:** https://athenaframework.org/Clock/top_level/

**Contents:**
- class Athena::Clock inherits Reference #
- Included modules
- Constants#
  - VERSION = "0.2.0"#
- Constructors#
  - .new(clock : ACLK::Interface | Nil = nil, location : Time::Location | Nil = nil)#
- Class methods#
  - .clock : ACLK::Interface#
  - .clock=(clock : ACLK::Interface)#
- Methods#

Decouples applications from the system clock.

Represents the global clock used by all Athena::Clock instances.

It is preferable injecting an Athena::Clock::Interface when possible versus using the global clock getter.

Represents the global clock used by all Athena::Clock instances.

It is preferable injecting an Athena::Clock::Interface when possible versus using the global clock getter.

Returns a new clock instance set to the provided location.

Returns the current time as determined by the clock.

Sleeps for the provided span of time.

---

## module Athena::MIME::Encoder::MIMEHeaderEncoderInterface #

**URL:** https://athenaframework.org/MIME/Encoder/MIMEHeaderEncoderInterface/

**Contents:**
- module Athena::MIME::Encoder::MIMEHeaderEncoderInterface #
- Direct including types
- Methods#
  - abstract #name : String#

Represents an encoder responsible for encoding the value of MIME headers.

Returns the name of this content encoding scheme.

---

## abstract struct Athena::EventDispatcher::Callable inherits Struct #

**URL:** https://athenaframework.org/EventDispatcher/Callable/

**Contents:**
- abstract struct Athena::EventDispatcher::Callable inherits Struct #
    - Name#
- Included modules
- Direct known subclasses
- Constructors#
  - .new(event_class : AED::Event.class, name : String | Nil, priority : Int32)#
- Methods#
  - #event_class : AED::Event.class#
  - #name : String#
  - #priority : Int32#

Encapsulates everything required to represent an event listener. Including what event is being listened on, the callback itself, and its priority.

Each subclass represents a specific "type" of listener. See each subclass for more information.

These types can be manually instantiated and added via the related AED::EventDispatcherInterface#listener(callable) overload. This can be useful as a point of integration to other libraries, such as lazily instantiating listener instances.

Each callable also has an optional name that can be useful for debugging to allow identifying a specific callable since there would be no way to tell apart two listeners on the same event, with the same priority.

AED::Callable::EventListenerInstance instances registered via AED::EventDispatcherInterface#listener(listener) will automatically have a name including the method and listener class names in the format of ClassName#method_name.

Returns what AED::Event class this callable represents.

Returns the name of this callable. Useful for debugging to identify a specific callable added from a block, or which method an AED::Callable::EventListenerInstance is associated with.

Returns the listener priority of this callable.

**Examples:**

Example 1 (php):
```php
class MyEvent < AED::Event; end

dispatcher = AED::EventDispatcher.new

dispatcher.listener(MyEvent) { }
dispatcher.listener(MyEvent, name: "block-listener") { }

class MyListener
  @[AEDA::AsEventListener]
  def on_my_event(event : MyEvent) : Nil
  end
end

dispatcher.listener MyListener.new

dispatcher.listeners(MyEvent).map &.name # => ["unknown callable", "block-listener", "MyListener#on_my_event"]
```

---

## annotation Athena::Serializer::Annotations::AccessorOrder #

**URL:** https://athenaframework.org/Serializer/Annotations/AccessorOrder/

**Contents:**
- annotation Athena::Serializer::Annotations::AccessorOrder #
  - Fields#
  - Example#

Can be applied to a type to control the order of properties when serialized. Valid values: :alphabetical, and :custom.

By default properties are ordered in the order in which they are defined.

**Examples:**

Example 1 (json):
```json
class Default
  include ASR::Serializable

  def initialize; end

  property a : String = "A"
  property z : String = "Z"
  property two : String = "two"
  property one : String = "one"
  property a_a : Int32 = 123

  @[ASRA::VirtualProperty]
  def get_val : String
    "VAL"
  end
end

ASR.serializer.serialize Default.new, :json # => {"a":"A","z":"Z","two":"two","one":"one","a_a":123,"get_val":"VAL"}

@[ASRA::AccessorOrder(:alphabetical)]
class Abc
  include ASR::Serializable

  def initialize; end

  property a : String = "A"
  property z : String = "Z"
  property two : String = "two"
  property one : String = "one"
  property a_a : Int32 = 123

  @[ASRA::VirtualProperty]
  def get_val : String
    "VAL"
  end
end

ASR.serializer.serialize Abc.new, :json # => {"a":"A","a_a":123,"get_val":"VAL","one":"one","two":"two","z":"Z"}

@[ASRA::AccessorOrder(:custom, order: ["two", "z", "get_val", "a", "one", "a_a"])]
class Custom
  include ASR::Serializable

  def initialize; end

  property a : String = "A"
  property z : String = "Z"
  property two : String = "two"
  property one : String = "one"
  property a_a : Int32 = 123

  @[ASRA::VirtualProperty]
  def get_val : String
    "VAL"
  end
end

ASR.serializer.serialize Custom.new, :json # => {"two":"two","z":"Z","get_val":"VAL","a":"A","one":"one","a_a":123}
```

---

## Athena::Framework::Bundle::Schema::ViewHandler#

**URL:** https://athenaframework.org/Framework/Bundle/Schema/ViewHandler/

**Contents:**
- Athena::Framework::Bundle::Schema::ViewHandler#
- Configuration Properties
  - serialize_nil#
  - empty_content_status#
  - failed_validation_status#

If nil values should be serialized.

The HTTP::Status used when there is no response content.

The HTTP::Status used when validations fail.

Currently not used. Included for future work.

---

## annotation Athena::Framework::Annotations::MapTime #

**URL:** https://athenaframework.org/Framework/Annotations/MapTime/

**Contents:**
- annotation Athena::Framework::Annotations::MapTime #

Allows customizing the time format and/or location used to parse the string datetime as part of the ATHR::Time resolver. See the related resolver documentation for more information.

---

## struct Athena::Framework::File inherits Athena::Framework::AbstractFile #

**URL:** https://athenaframework.org/Framework/File/

**Contents:**
- struct Athena::Framework::File inherits Athena::Framework::AbstractFile #

Represents a file on the filesystem without opening a file descriptor. See ATH::AbstractFile for the available API.

---

## module Athena::Framework::Controller::ArgumentResolverInterface #

**URL:** https://athenaframework.org/Framework/Controller/ArgumentResolverInterface/

**Contents:**
- module Athena::Framework::Controller::ArgumentResolverInterface #
- Direct including types
- Methods#
  - abstract #get_arguments(request : ATH::Request, route : ATH::ActionBase) : Array#

Responsible for resolving the arguments that will be passed to a controller action.

See the Getting Started docs for more information.

Returns an array of arguments resolved from the provided request for the given route.

---

## Introduction

**URL:** https://athenaframework.org/Dotenv/

**Contents:**
- Introduction
- Installation#
- Usage#

The Athena::Dotenv component parses the .env files to make ENV vars stored within them accessible. Using Environment variables (ENV vars) is a common practice to configure options that depend on where the application is run; allowing the application's configuration to be de-coupled from its code. E.g. anything that changes from one machine to another, such as database credentials.

.env files are a convenient way to get the benefits of ENV vars, without taking on the extra complexity of other tools/abstractions until if/when they are needed. The file(s) can be defined at the root of your project for development, or placed next to the binary if running outside of a dev environment.

First, install the component by adding the following to your shard.yml, then running shards install:

In most cases all that needs to be done is:

For more complex setups, the Athena::Dotenv instance can be manually instantiated. E.g. to use the other helper methods such as #load_environment, #overload, or #populate

Athena::Dotenv::Exception::Path error will be raised if the provided file was not found, or is not readable.

**Examples:**

Example 1 (yaml):
```yaml
dependencies:
  athena-dotenv:
    github: athena-framework/dotenv
    version: ~> 0.2.0
```

Example 2 (yaml):
```yaml
require "athena-dotenv"

# For most use cases, returns a `Athena::Dotenv` instance.
dotenv = Athena::Dotenv.load # Loads .env

# Multiple files may also be loaded if needed
Athena::Dotenv.load ".env", ".env.local"
```

Example 3 (markdown):
```markdown
require "athena-dotenv"

dotenv = Athena::Dotenv.new

# Overrides existing variables
dotenv.overload ".env.overrides"

# Load all files for the current $APP_ENV
# .env, .env.local, and .env.$APP_ENV.local or .env.$APP_ENV
dotenv.load_environment ".env"
```

---

## struct Athena::Console::Loader::Factory inherits Struct #

**URL:** https://athenaframework.org/Console/Loader/Factory/

**Contents:**
- struct Athena::Console::Loader::Factory inherits Struct #
- Included modules
- Constructors#
  - .new(factories : Hash(String, Proc(ACON::Command)))#
- Methods#
  - #get(name : String) : ACON::Command#
  - #has?(name : String) : Bool#
  - #names : Array(String)#

A default implementation of ACON::Loader::Interface that accepts a Hash(String, Proc(ACON::Command)).

A factory could then be set on the ACON::Application:

Returns an ACON::Command with the provided name. Raises ACON::Exception::CommandNotFound if it is not defined.

Returns true if self has a command with the provided name, otherwise false.

Returns all of the command names defined within self.

**Examples:**

Example 1 (javascript):
```javascript
application = MyCustomApplication.new "My CLI"

application.command_loader = Athena::Console::Loader::Factory.new({
  "command1"        => Proc(ACON::Command).new { Command1.new },
  "app:create-user" => Proc(ACON::Command).new { CreateUserCommand.new },
})

application.run
```

---

## class Athena::Validator::Constraints::Range inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/Range/

**Contents:**
- class Athena::Validator::Constraints::Range inherits Athena::Validator::Constraint #
- Configuration#
  - Required Arguments#
    - range#
  - Optional Arguments#
    - not_in_range_message#
      - Placeholders#
    - min_message#
      - Placeholders#
    - max_message#

Validates that a Number or Time value is between some minimum and maximum.

The ::Range that defines the minimum and maximum values, if any. An endless range can be used to only have a minimum or maximum.

This constraint does not support a message argument.

Type: String Default: This value should be between {{ min }} and {{ max }}.

The message that will be shown if the value is less than the min or greater than the max.

The following placeholders can be used in this message:

Type: String Default: This value should be {{ limit }} or more.

The message that will be shown if the value is less than the min, and no max has been provided.

The following placeholders can be used in this message:

Type: String Default: This value should be {{ limit }} or less.

The message that will be shown if the value is more than the max, and no min has been provided.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class House
  include AVD::Validatable

  def initialize(@area : Number); end

  @[Assert::Range(15..100)]
  property area : Number
end
```

---

## struct Athena::Console::Helper::Table::CellStyle inherits Struct #

**URL:** https://athenaframework.org/Console/Helper/Table/CellStyle/

**Contents:**
- struct Athena::Console::Helper::Table::CellStyle inherits Struct #
- Constructors#
  - .new(foreground : String = "default", background : String = "default", align : ACON::Helper::Table::Alignment = :left, format : String | Nil = nil)#
- Methods#
  - #align : ACON::Helper::Table::Alignment#
  - #background : String#
  - #foreground : String#
  - #format : String | ::Nil#

Represents the styling for a specific ACON::Helper::Table::Cell.

How the text should be aligned in the cell.

See ACON::Helper::Table::Alignment.

Returns the background color for this cell.

Can be any color string supported via ACON::Formatter::OutputStyleInterface, e.g. named ("red") or hexadecimal ("#38bdc2") colors.

Returns the foreground color for this cell.

Can be any color string supported via ACON::Formatter::OutputStyleInterface, e.g. named ("red") or hexadecimal ("#38bdc2") colors.

A sprintf format string representing the content of the cell. Should have a single %s representing the cell's value.

Can be used to reuse custom style tags. E.g. "<fire>%s</>".

---

## module Athena::Framework::View::ViewHandlerInterface #

**URL:** https://athenaframework.org/Framework/View/ViewHandlerInterface/

**Contents:**
- module Athena::Framework::View::ViewHandlerInterface #
- Direct including types
- Methods#
  - abstract #create_redirect_response(view : ATH::ViewBase, location : String, format : String) : ATH::Response#
  - abstract #create_response(view : ATH::ViewBase, request : ATH::Request, format : String) : ATH::Response#
  - abstract #handle(view : ATH::ViewBase, request : ATH::Request | Nil = nil) : ATH::Response#
  - abstract #register_handler(format : String, handler : ATH::View::ViewHandlerInterface::HandlerType) : Nil#
  - abstract #supports?(format : String) : Bool#

Processes an ATH::View into an ATH::Response of the proper format.

See the Getting Started docs for more information.

Creates an ATH::Response based on the provided view that'll redirect to the provided location.

location may either be a URL or the name of a route.

Creates an ATH::Response based on the provided view and request.

Handles the conversion of the provided view into an ATH::Response.

If no request is provided, it is fetched from ATH::RequestStore.

Registers the provided handler to handle the provided format.

Determines if self can handle the provided format.

First checks if a custom format handler supports the provided format, otherwise falls back on the ASR::SerializerInterface.

---

## module Athena::Validator::Constraints #

**URL:** https://athenaframework.org/Validator/Constraints/

**Contents:**
- module Athena::Validator::Constraints #

Contains all of the built in AVD::Constraints. See each individual constraint for more information. The Assert alias is used to apply these constraints via annotations.

---

## annotation Athena::Serializer::Annotations::Name #

**URL:** https://athenaframework.org/Serializer/Annotations/Name/

**Contents:**
- annotation Athena::Serializer::Annotations::Name #
  - Fields#
  - Example#
    - Naming Strategies#

Defines the key to use during (de)serialization. If not provided, the name of the property is used. Also allows defining aliases that can be used for that property when deserializing.

By default the keys in the serialized data match exactly to the name of the property. Naming strategies allow changing this behavior for all properties within the type. The serialized name can still be overridden on a per-property basis via using the ASRA::Name annotation with the serialize, deserialize or key field. The strategy will be applied on serialization, deserialization or both, depending on whether serialization_strategy, deserialization_strategy or strategy is used.

The available naming strategies include: * :camelcase * :underscore * :identical

**Examples:**

Example 1 (json):
```json
class Example
  include ASR::Serializable

  def initialize; end

  @[ASRA::Name(serialize: "myAddress")]
  property my_home_address : String = "123 Fake Street"

  @[ASRA::Name(deserialize: "some_key", serialize: "a_value")]
  property both_names : String = "str"

  @[ASRA::Name(key: "same")]
  property same_in_both_directions : String = "same for both"

  @[ASRA::Name(aliases: ["val", "value", "some_value"])]
  property some_value : String = "some_val"
end

ASR.serializer.serialize Example.new, :json # => {"myAddress":"123 Fake Street","a_value":"str","same":"same for both","some_value":"some_val"}

obj = ASR.serializer.deserialize Example, %({"my_home_address":"555 Mason Ave","some_key":"deserialized from diff key","same":"same again","value":"some_other_val"}), :json

obj.my_home_address         # => "555 Mason Ave"
obj.both_names              # => "deserialized from diff key"
obj.same_in_both_directions # => "same again"
obj.some_value              # => "some_other_val"
```

Example 2 (json):
```json
@[ASRA::Name(strategy: :camelcase)]
class User
  include ASR::Serializable

  def initialize; end

  property id : Int32 = 1
  property first_name : String = "Jon"
  property last_name : String = "Snow"
end

ASR.serializer.serialize User.new, :json # => {"id":1,"firstName":"Jon","lastName":"Snow"}
```

---

## module Athena::MIME #

**URL:** https://athenaframework.org/MIME/top_level/

**Contents:**
- module Athena::MIME #
- Constants#
  - VERSION = "0.2.1"#

Allows manipulating the MIME messages used to send emails and provides utilities related to MIME types.

---

## Introduction

**URL:** https://athenaframework.org/Clock/

**Contents:**
- Introduction
- Installation#
- Usage#

The Athena::Clock component allows decoupling an application from the system clock. This allows for more easily testing time sensitive code.

The component provides a ACLK::Interface with the following implementations for different use cases:

First, install the component by adding the following to your shard.yml, then running shards install:

The core Athena::Clock type can be used to return the current time via a global clock.

**Examples:**

Example 1 (yaml):
```yaml
dependencies:
  athena-clock:
    github: athena-framework/clock
    version: ~> 0.2.0
```

Example 2 (sql):
```sql
# By default, `Athena::Clock` uses the native clock implementation,
# but it can be changed to any other implementation
Athena::Clock.clock = ACLK::Monotonic.new

# Then, obtain a clock instance
clock = ACLK.clock

# Optionally, with in a specific location
berlin_clock = clock.in_location Time::Location.load "Europe/Berlin"

# From here, get the current time as a `Time` instance
now = clock.now # : ::Time

# and sleep for any span of time
clock.sleep 2.seconds
```

---

## Introduction

**URL:** https://athenaframework.org/Spec/

**Contents:**
- Introduction
- Installation#
- Usage#

The Athena::Spec component provides common/helpful Spec compliant testing utilities.

This component is NOT a standalone testing framework, but is fully intended to be mixed with standard describe, it, and/or pending blocks depending on which approach makes the most sense for what is being tested.

First, install the component by adding the following to your shard.yml, then running shards install:

Next, require the shard within your spec/spec_helper.cr file, being sure things are required in this order:

Finally, call ASPEC.run_all at the bottom of spec/spec_helper.cr to ensure ASPEC::TestCase based specs are ran as expected.

A core focus of this component is allowing for a more classic unit testing approach that makes it easy to share/reduce test code duplication. ASPEC::TestCase being the core type of this.

The primary benefit of this approach is that logic is more easily shared/reused as compared to the normal block based approach. I.e. a component can provide a base test case type that can be inherited from, a few methods implemented, and tada. For example, AVD::Spec::ConstraintValidatorTestCase.

The ASPEC::TestCase::DataProvider and ASPEC::TestCase::TestWith annotations can make testing similar code with different inputs super easy!

**Examples:**

Example 1 (yaml):
```yaml
dependencies:
  athena-spec:
    github: athena-framework/spec
    version: ~> 0.4.0
```

Example 2 (unknown):
```unknown
require "spec"
require "../src/main" # Or whatever the name of your entrypoint file is called
require "athena-spec"
```

Example 3 (julia):
```julia
struct ExampleSpec < ASPEC::TestCase
  def test_add : Nil
    (1 + 2).should eq 3
  end
end
```

---

## annotation Athena::Framework::Annotations::MapRequestBody #

**URL:** https://athenaframework.org/Framework/Annotations/MapRequestBody/

**Contents:**
- annotation Athena::Framework::Annotations::MapRequestBody #
- Configuration#
  - Optional Arguments#
    - accept_formats#
    - validation_groups#

Enables the ATHR::RequestBody resolver for the parameter this annotation is applied to based on the request's body. See the related resolver documentation for more information.

Type: Array(String)? Default: nil

Allows whitelisting the allowed Set {"application/atom+xml"}, "css" => Set {"text/css"}, "csv" => Set {"text/csv"}, "form" => Set {"application/x-www-form-urlencoded", "multipart/form-data"}, "html" => Set {"text/html", "application/xhtml+xml"}, "js" => Set {"application/javascript", "application/x-javascript", "text/javascript"}, "json" => Set {"application/json", "application/x-json"}, "jsonld" => Set {"application/ld+json"}, "rdf" => Set {"application/rdf+xml"}, "rss" => Set {"application/rss+xml"}, "txt" => Set {"text/plain"}, "xml" => Set {"text/xml", "application/xml", "application/x-xml"}}" href="../../Request/#Athena::Framework::Request::FORMATS">request format(s). If the ATH::Request#content_type_format is not included in this list, a ATH::Exception::UnsupportedMediaType error will be raised.

Type: Array(String) | AVD::Constraints::GroupSequence | Nil Default: nil

The validation groups that should be used when validating the resolved object.

**Examples:**

Example 1 (php):
```php
class UserController < ATH::Controller
  @[ARTA::Post("/user")]
  def new_user(
    @[ATHA::MapRequestBody]
    user_create : UserCreateDTO,
  ) : UserCreateDTO
    user_create
  end
end
```

---

## class Athena::Console::Question::MultipleChoice(T) inherits Athena::Console::Question::AbstractChoice #

**URL:** https://athenaframework.org/Console/Question/MultipleChoice/

**Contents:**
- class Athena::Console::Question::MultipleChoice(T) inherits Athena::Console::Question::AbstractChoice #
- Constructors#
  - .new(question : String, choices : Hash(String | Int32, T), default : T | Nil = nil)#
  - .new(question : String, choices : Indexable(T), default : Int | T | Nil = nil)#

Similar to ACON::Question::Choice, but allows for more than one answer to be selected. This question accepts a comma separated list of answers.

This question is also similar to ACON::Question::Choice in that you can provide either the index, key, or value of the choice. For example submitting green,0 would result in ["green", "red"] as the value of answer.

**Examples:**

Example 1 (swift):
```swift
question = ACON::Question::MultipleChoice.new "What is your favorite color?", {"red", "blue", "green"}

helper = self.helper ACON::Helper::Question
answer = helper.ask input, output, question
```

---

## Aliases

**URL:** https://athenaframework.org/EventDispatcher/aliases/

**Contents:**
- Aliases
- alias AED #
  - Alias definition
- alias AEDA #
  - Alias definition

Convenience alias to make referencing Athena::EventDispatcher types easier.

Convenience alias to make referencing AED::Annotations types easier.

---

## enum Athena::Framework::UploadedFile::Status #

**URL:** https://athenaframework.org/Framework/UploadedFile/Status/

**Contents:**
- enum Athena::Framework::UploadedFile::Status #
- Members#
  - OK = 0#
  - SIZE_LIMIT_EXCEEDED = 1#
- Methods#
  - #ok?#
  - #size_limit_exceeded?#

Represents the status of an uploaded file. A successful upload would have a status of OK, otherwise the enum member denotes the reason why the upload failed.

Maybe add more status members?

Represents a successful upload.

Represents a failed upload due to the file being larger than the configured max allowed size.

Returns true if this enum value equals OK

Returns true if this enum value equals SIZE_LIMIT_EXCEEDED

---

## module Athena::Console::Loader::Interface #

**URL:** https://athenaframework.org/Console/Loader/Interface/

**Contents:**
- module Athena::Console::Loader::Interface #
- Direct including types
- Methods#
  - abstract #get(name : String) : ACON::Command#
  - abstract #has?(name : String) : Bool#
  - abstract #names : Array(String)#

Normally the ACON::Application#add method requires instances of each command to be provided. ACON::Loader::Interface provides a way to lazily instantiate only the command(s) being called, which can be more performant since not every command needs instantiated.

Returns an ACON::Command with the provided name. Raises ACON::Exception::CommandNotFound if it is not defined.

Returns true if self has a command with the provided name, otherwise false.

Returns all of the command names defined within self.

---

## class Athena::Validator::Constraints::URL inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/URL/

**Contents:**
- class Athena::Validator::Constraints::URL inherits Athena::Validator::Constraint #
- Configuration#
  - Optional Arguments#
    - protocols#
    - relative_protocol#
    - require_tld#
    - tld_message#
      - Placeholders#
    - message#
      - Placeholders#

Validates that a value is a valid URL string. The underlying value is converted to a string via #to_s before being validated.

As with most other constraints, nil and empty strings are considered valid values, in order to allow the value to be optional. If the value is required, consider combining this constraint with AVD::Constraints::NotBlank.

Type: Array(String) Default: ["http", "https"]

The protocols considered to be valid for the URL.

Type: Bool Default: false

If true the protocol is considered optional.

Type: Bool Default: true

The URL spec considers URLs like https://aaa or https://foobar to be valid However, this is most likely not desirable for most use cases. As such, this argument defaults to true and can be used to require that the host part of the URL will have to include a TLD (top-level domain name). E.g. https://example.com is valid but https://example is not.

This constraint does NOT validate that the provided TLD is a valid one according to the official list.

Type: String Default: This URL is missing a top-level domain.

The message that will be shown if #require_tld? is true and the URL does not contain at least one TLD.

The following placeholders can be used in this message:

Type: String Default: This value is not a valid URL.

The message that will be shown if the URL is not valid.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class Profile
  include AVD::Validatable

  def initialize(@avatar_url : String); end

  @[Assert::URL]
  property avatar_url : String
end
```

---

## class Athena::MIME::Header::Parameterized inherits Athena::MIME::Header::Unstructured #

**URL:** https://athenaframework.org/MIME/Header/Parameterized/

**Contents:**
- class Athena::MIME::Header::Parameterized inherits Athena::MIME::Header::Unstructured #
- Constructors#
  - .new(name : String, value : String, parameters : Hash(String, String) = {} of String => String)#
- Methods#
  - #[](name : String) : String#
  - #[]=(key : String, value : String) : Nil#
  - #parameters : Hash(String, String)#
  - #parameters=(parameters : Hash(String, String))#

Represents a MIME Header for something like content-type (key/value pairs of metadata included in the value).

Returns the value of the parameter with the provided name

Set the value of the parameter with the provided name to value.

Represents the parameters associated with this header.

Represents the parameters associated with this header.

---

## annotation Athena::Serializer::Annotations::Groups #

**URL:** https://athenaframework.org/Serializer/Annotations/Groups/

**Contents:**
- annotation Athena::Serializer::Annotations::Groups #

Defines the group(s) a property belongs to. Properties are automatically added to the default group if no groups are explicitly defined.

See ASR::ExclusionStrategies::Groups.

---

## annotation Athena::Console::Annotations::AsCommand #

**URL:** https://athenaframework.org/Console/Annotations/AsCommand/

**Contents:**
- annotation Athena::Console::Annotations::AsCommand #
  - Configuration#
    - name#
    - description#
    - hidden#
    - aliases#

Annotation containing metadata related to an ACON::Command. This is the preferred way of configuring a command.

Various fields can be used within this annotation to control various aspects of the command. All fields are optional unless otherwise noted.

Type: String - required

The name of the command. May be provided as either an explicit named argument, or the first positional argument. See ACON::Command#name.

A short sentence describing the function of the command. See ACON::Command#description.

If this command should be hidden from the command list. See ACON::Command#hidden?.

Type: Enumerable(String)

Alternate names this command may be invoked by. See ACON::Command#aliases.

**Examples:**

Example 1 (php):
```php
@[ACONA::AsCommand("add", description: "Sums two numbers, optionally making making the sum negative")]
class AddCommand < ACON::Command
  # ...
end
```

---

## struct Athena::Framework::Controller::ValueResolvers::Request inherits Struct #

**URL:** https://athenaframework.org/Framework/Controller/ValueResolvers/Request/

**Contents:**
- struct Athena::Framework::Controller::ValueResolvers::Request inherits Struct #
- Included modules
- Constructors#
  - .new#
- Methods#
  - #initialize#
  - #resolve(request : ATH::Request, parameter : ATH::Controller::ParameterMetadata) : ATH::Request | Nil#

Handles resolving a value for action parameters typed as ATH::Request.

Returns a value resolved from the provided request and parameter if possible, otherwise returns nil if no parameter could be resolved.

**Examples:**

Example 1 (julia):
```julia
@[ARTA::Get("/")]
def get_request_path(request : ATH::Request) : String
  request.path
end
```

---

## abstract struct Athena::Framework::AbstractFile inherits Struct #

**URL:** https://athenaframework.org/Framework/AbstractFile/

**Contents:**
- abstract struct Athena::Framework::AbstractFile inherits Struct #
- Direct known subclasses
- Constructors#
  - .new(path : String | Path, check_path : Bool = true)#
- Methods#
  - #basename(suffix : String | Nil = nil) : String#
  - #content : String#
  - #extname : String#
  - #guess_extension : String | ::Nil#
  - #mime_type : String | ::Nil#

Represents a file on the filesystem without opening a file descriptor. This base type is needed as you can't inherit from non-abstract structs, and it makes sense to have a generic Athena::Framework::File type while also being able to share the logic with other sub-types.

Add more methods as needed.

Create a new instance for the file at the provided path. If check_path is true, then an ATH::Exception::FileNotFound exception is raised if the file at the provided path does not exist.

Returns the last component of this file's path. If suffix is present at the end of the path, it is removed.

Returns the contents of this file as a string.

Returns the extension of this file, or an empty string if it does not have one.

Returns the extension based on the MIME type of this file, or nil if it is unknown. Uses the MIME type as guessed by #mime_type to guess the file extension.

Returns the MIME type of this file, using AMIME::Types under the hood.

Returns the time this file was last modified.

Moves this file to the provided directory, optionally with the provided name. If no name is provided, its current #basename will be used.

Returns the path to this file, which may be relative.

Returns true if this file is readable by user of this process, otherwise returns false.

Resolves the real path of this file by following symbolic links.

Returns the size in bytes of this file.

**Examples:**

Example 1 (javascript):
```javascript
file = ATH::File.new "/path/to/file.txt"
file.basename        # => "file.txt"
file.basename ".txt" # => "file"
```

Example 2 (javascript):
```javascript
file = ATH::File.new "/path/to/foo.txt"
file.content # => "foo" (content of foo.txt)
```

Example 3 (javascript):
```javascript
file = ATH::File.new "/path/to/file.txt"
file.extname # => "txt"
```

Example 4 (javascript):
```javascript
file = ATH::File.new "/path/to/foo.txt"
file.guess_extension # => "txt"
```

---

## Introduction

**URL:** https://athenaframework.org/

**Contents:**
- Introduction
- Athena#
- Athena Framework#
  - Feature Highlights#
- Resources#

Athena is a collection of general-purpose, robust, independent, and reusable components with the goal of powering a software ecosystem. These include:

These components may be used on their own to aid in existing projects or integrated into existing (or new) frameworks.

Each component may also define additional shortcut aliases. Check the Aliases page of each component in the API Reference for more information.

Athena also provides the Framework component that integrates select components into a single cohesive, flexible, and modular framework. It is designed in such a way to be non-intrusive and not require a strict organizational convention in regards to how a project is setup; this allows it to use a minimal amount of setup boilerplate while not preventing it for more complex projects. Not every component needs to be used or understood to start using the framework, only those which are required for the task at hand.

Athena Framework has quite a few unique features that set it a part from other Crystal frameworks:

The demo application serves as a good example of what an application using the framework could look like.

---

## struct Athena::Framework::RequestMatcher::Hostname inherits Struct #

**URL:** https://athenaframework.org/Framework/RequestMatcher/Hostname/

**Contents:**
- struct Athena::Framework::RequestMatcher::Hostname inherits Struct #
- Included modules
- Constructors#
  - .new(regex : Regex)#
- Methods#
  - #matches?(request : ATH::Request) : Bool#

Checks if the ATH::Request#hostname matches the allowed pattern.

Decides whether the rule(s) implemented by the strategy matches the provided request.

---

## class Athena::Framework::Events::View inherits Athena::EventDispatcher::Event #

**URL:** https://athenaframework.org/Framework/Events/View/

**Contents:**
- class Athena::Framework::Events::View inherits Athena::EventDispatcher::Event #
- Included modules
- Constructors#
  - .new(request : ATH::Request, action_result : _)#
- Methods#
  - #action_result#
  - #action_result=(value : _) : Nil#

Emitted after the route's action has been executed, but only if it does NOT return an ATH::Response.

This event can be listened on to handle converting a non ATH::Response into an ATH::Response.

See the Getting Started docs for more information.

Returns the value returned from the related controller action.

Overrides the return value of the related controller action.

Can be used to mutate the controller action's returned value within a listener context; such as for pagination.

---

## class Athena::Dotenv::Exception::Logic inherits Exception #

**URL:** https://athenaframework.org/Dotenv/Exception/Logic/

**Contents:**
- class Athena::Dotenv::Exception::Logic inherits Exception #
- Included modules
- Direct known subclasses

Represents a code logic error that should lead directly to a fix in your code.

---

## struct Athena::Framework::Controller::ValueResolvers::RequestBody inherits Struct #

**URL:** https://athenaframework.org/Framework/Controller/ValueResolvers/RequestBody/

**Contents:**
- struct Athena::Framework::Controller::ValueResolvers::RequestBody inherits Struct #
- Included modules
- Constructors#
  - .new(serializer : ASR::SerializerInterface, validator : AVD::Validator::ValidatorInterface)#
- Methods#
  - #resolve(request : ATH::Request, parameter : ATH::Controller::ParameterMetadata)#

Attempts to resolve the value of any parameter with the ATHA::MapRequestBody annotation by deserializing the request body into an object of the type of the related parameter. The ATHA::MapQueryString annotation works similarly, but uses the request's query string instead of its body. Lastly, the ATHA::MapUploadedFile annotation works by resolving one or more ATH::UploadedFile from ATH::Request#files.

If the object is also AVD::Validatable, any validations defined on it are executed before returning the object. Requires the type of the related parameter to include one or more of:

Making a request to the /user endpoint with the following payload:

This resolver also supports application/x-www-form-urlencoded payloads.

Would return the response:

While a valid request would return this response body, with a 201 status code:

Returns a value resolved from the provided request and parameter if possible, otherwise returns nil if no parameter could be resolved.

**Examples:**

Example 1 (julia):
```julia
require "athena"

# A type representing the structure of the request body.
struct UserCreate
  # Include some modules to tell Athena this type can be deserialized and validated
  include AVD::Validatable
  include JSON::Serializable

  # Assert the user's name is not blank.
  @[Assert::NotBlank]
  getter first_name : String

  # Assert the user's name is not blank.
  @[Assert::NotBlank]
  getter last_name : String

  # Assert the user's email is not blank and is a valid HTMl5 email.
  @[Assert::NotBlank]
  @[Assert::Email(:html5)]
  getter email : String
end

class UserController < ATH::Controller
  @[ARTA::Post("/user")]
  @[ATHA::View(status: :created)]
  def new_user(
    @[ATHA::MapRequestBody]
    user_create : UserCreate,
  ) : UserCreate
    # Use the provided UserCreate instance to create an actual User DB record.
    # For purposes of this example, just return the instance.

    user_create
  end
end

ATH.run
```

Example 2 (json):
```json
{
  "first_name": "George",
  "last_name": "",
  "email": "athenaframework.org"
}
```

Example 3 (json):
```json
{
  "code": 422,
  "message": "Validation failed",
  "errors": [
    {
      "property": "last_name",
      "message": "This value should not be blank.",
      "code": "0d0c3254-3642-4cb0-9882-46ee5918e6e3"
    },
    {
      "property": "email",
      "message": "This value is not a valid email address.",
      "code": "ad9d877d-9ad1-4dd7-b77b-e419934e5910"
    }
  ]
}
```

Example 4 (json):
```json
{
  "first_name": "George",
  "last_name": "Dietrich",
  "email": "[email protected]"
}
```

---

## enum Athena::Console::Input::Option::Value #

**URL:** https://athenaframework.org/Console/Input/Option/Value/

**Contents:**
- enum Athena::Console::Input::Option::Value #
- Members#
  - NONE = 0#
  - REQUIRED = 1#
  - OPTIONAL = 2#
  - IS_ARRAY = 4#
  - NEGATABLE = 8#
  - None = 0#
  - All = 15#
- Methods#

Represents the possible vale types of an ACON::Input::Option.

Value modes can also be combined using the Enum.[] macro. For example, ACON::Input::Option::Value[:required, :is_array] which defines a required array option.

Represents a boolean flag option that will be true if provided, otherwise false. E.g. --yell.

Represents an option that MUST have a value if provided. The option itself is still optional. E.g. --dir=src.

Represents an option that MAY have a value, but it is not a requirement. E.g. --yell or --yell=loud.

When using the option value mode, it can be hard to distinguish between passing an option without a value and not passing it at all. In this case you should set the default of the option to false, instead of the default of nil. Then you would be able to tell it wasn't passed by the value being false, passed without a value as nil, and passed with a value.

In this context you will need to work with the raw String? representation of the value due to the union of types the value could be.

Represents an option that can be provided multiple times to produce an array of values. E.g. --dir=/foo --dir=/bar.

Similar to NONE, but also accepts its negation. E.g. --yell or --no-yell.

Returns true if this enum value contains IS_ARRAY

Returns true if this enum value contains NEGATABLE

Returns true if this enum value contains NONE

Returns true if this enum value contains OPTIONAL

Returns true if this enum value contains REQUIRED

---

## class Athena::MIME::Header::MailboxList inherits Athena::MIME::Header::Abstract #

**URL:** https://athenaframework.org/MIME/Header/MailboxList/

**Contents:**
- class Athena::MIME::Header::MailboxList inherits Athena::MIME::Header::Abstract #
- Constructors#
  - .new(name : String, value : Array(AMIME::Address))#
- Methods#
  - #add_addresses(addresses : Array(AMIME::Address)) : Nil#
  - #address_strings : Array(String)#
  - #body : Array(AMIME::Address)#
  - #body=(body : Array(AMIME::Address))#

Represents a Mailbox MIME Header for something like from, to, cc, or bcc (one or more named address).

Adds the provided addresses to use in the value of this header.

Returns the full mailbox list of this Header as an array of valid RFC 2822 strings.

Returns the body of this header.

Sets the body of this header.

---

## class Athena::MIME::Header::Unstructured inherits Athena::MIME::Header::Abstract #

**URL:** https://athenaframework.org/MIME/Header/Unstructured/

**Contents:**
- class Athena::MIME::Header::Unstructured inherits Athena::MIME::Header::Abstract #
- Direct known subclasses
- Constructors#
  - .new(name : String, value : String)#
- Methods#
  - #body : String#
  - #body=(body : String)#

Represents a simple MIME Header (key/value).

Returns the body of this header.

Sets the body of this header.

---

## alias Athena::Console::Helper::ProgressBar::PlaceholderFormatter #

**URL:** https://athenaframework.org/Console/Helper/ProgressBar/PlaceholderFormatter/

**Contents:**
- alias Athena::Console::Helper::ProgressBar::PlaceholderFormatter #
- Alias definition

Represents the expected type of a Placeholder Formatter.

---

## class Athena::Framework::View::Context inherits Reference #

**URL:** https://athenaframework.org/Framework/View/Context/

**Contents:**
- class Athena::Framework::View::Context inherits Reference #
- Methods#
  - #add_exclusion_strategy(strategy : ASR::ExclusionStrategies::ExclusionStrategyInterface) : self#
  - #add_group(group : String) : self#
  - #add_groups(groups : Enumerable(String)) : self#
  - #add_groups(*groups : String) : self#
  - #emit_nil=(emit_nil : Bool | Nil)#
  - #emit_nil? : Bool | ::Nil#
  - #exclusion_strategies#
  - #groups : Set(String) | ::Nil#

Represents (de)serialization options in a serializer agnostic way.

Adds the provided strategy to the #exclusion_strategies array.

Adds the provided group to the #groups array.

Adds the provided groups to the #groups array.

Adds the provided groups to the #groups array.

Determines if properties with nil values should be emitted.

Determines if properties with nil values should be emitted.

Returns any ASR::ExclusionStrategies::ExclusionStrategyInterface that should be used by the serializer.

Returns the groups that can be used to create different "views" of an object.

ASR::ExclusionStrategies::Groups is an example of this.

Sets the #groups array to the provided groups.

Represents the version of an object. Can be used to control what properties are serialized based on the version.

ASR::ExclusionStrategies::Version is an example of this.

Represents the version of an object. Can be used to control what properties are serialized based on the version.

ASR::ExclusionStrategies::Version is an example of this.

Sets the #version to the provided version.

---

## annotation Athena::Serializer::Annotations::VirtualProperty #

**URL:** https://athenaframework.org/Serializer/Annotations/VirtualProperty/

**Contents:**
- annotation Athena::Serializer::Annotations::VirtualProperty #
  - Example#

Can be applied to a method to make it act like a property.

The return type restriction MUST be defined.

**Examples:**

Example 1 (json):
```json
class Example
  include ASR::Serializable

  def initialize; end

  property foo : String = "foo"

  @[ASRA::VirtualProperty]
  @[ASRA::Name(serialize: "testing")]
  def some_method : Bool
    false
  end

  @[ASRA::VirtualProperty]
  def get_val : String
    "VAL"
  end
end

ASR.serializer.serialize Example.new, :json # => {"foo":"foo","testing":false,"get_val":"VAL"}
```

---

## class Athena::Validator::Constraints::Choice inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/Choice/

**Contents:**
- class Athena::Validator::Constraints::Choice inherits Athena::Validator::Constraint #
- Configuration#
  - Required Arguments#
    - choices#
  - Optional Arguments#
    - message#
      - Placeholders#
    - multiple_message#
      - Placeholders#
    - min_message#

Validates that a value is one of a given set of valid choices; can also be used to validate that each item in a collection is one of those valid values.

Type: Array(String | Number::Primitive | Symbol)

The choices that are considered valid.

Type: String Default: This value is not a valid choice.

The message that will be shown if the value is not a valid choice and multiple is false.

The following placeholders can be used in this message:

Type: String Default: One or more of the given values is invalid.

The message that will be shown if one of the values is not a valid choice and multiple is true.

The following placeholders can be used in this message:

Type: String Default: You must select at least {{ limit }} choice.|You must select at least {{ limit }} choices.

The message that will be shown if too few choices are chosen as per the range option.

The following placeholders can be used in this message:

Type: String Default: You must select at most {{ limit }} choice.|You must select at most {{ limit }} choices.

The message that will be shown if too many choices are chosen as per the range option.

The following placeholders can be used in this message:

Type: ::Range? Default: nil

If multiple is true, is used to define the "range" of how many choices must be valid for the value to be considered valid. For example, if set to (3..), but there are only 2 valid items in the input enumerable then validation will fail.

Beginless/endless ranges can be used to define only a lower/upper bound.

Type: Bool Default: false

If true, the input value is expected to be an Enumerable instead of a single scalar value. The constraint will check each item in the enumerable is valid choice.

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class User
  include AVD::Validatable

  def initialize(@role : String); end

  @[Assert::Choice(["member", "moderator", "admin"])]
  property role : String
end
```

---

## class Athena::Console::Question(T) inherits Reference #

**URL:** https://athenaframework.org/Console/Question/

**Contents:**
- class Athena::Console::Question(T) inherits Reference #
  - Usage#
    - Trimming the Answer#
    - Multiline Input#
    - Hiding User Input#
    - Normalizing the Answer#
    - Validating the Answer#
    - Autocompletion#
- Included modules
- Direct known subclasses

This namespaces contains various questions that can be asked via the ACON::Helper::Question helper or ART::Style::Athena style.

This class can also be used to ask the user for more information in the most basic form, a simple question and answer.

This will prompt to user to enter their name. If they do not enter valid input, the default value of nil will be used. The default can be customized, ideally with sane defaults to make the UX better.

By default the answer is trimmed in order to remove leading and trailing white space. The ACON::Question::Base#trimmable= method can be used to disable this if you need the input as is.

The question helper will stop reading input when it receives a newline character. I.e. the user presses the ENTER key. However in some cases you may want to allow for an answer that spans multiple lines. The ACON::Question::Base#multi_line= method can be used to enable multi line mode.

Multiline questions stop reading user input after receiving an end-of-transmission control character. (Ctrl+D on Unix systems).

If your question is asking for sensitive information, such as a password, you can set a question to hidden. This will make it so the input string is not displayed on the terminal, which is equivalent to how password are handled on Unix systems.

If no method to hide the response is available on the underlying system/input, it will fallback and allow the response to be seen. If having the hidden response hidden is vital, you MUST set ACON::Question::Base#hidden_fallback= to false; which will raise an exception instead of allowing the input to be visible.

The answer can be "normalized" before being validated to fix any small errors or tweak it as needed. For example, you could normalize the casing of the input:

It is possible for input to be nil in this case, so that need to also be handled in the block. The block should return a value of the same type of the generic, in this case String?.

The normalizer is called first and its return value is used as the input of the validator. If the answer is invalid do not raise an exception in the normalizer and let the validator handle it.

If the answer to a question needs to match some specific requirements, you can register a question validator to check the validity of the answer. This callback should raise an exception if the input is not valid, such as ArgumentError. Otherwise, it must return the input value.

In this example, we are asserting that the user's name does not start with numeric digits. If the user entered 123Jim, they would be told it is an invalid answer and prompted to answer the question again. By default the user would have an unlimited amount of retries to get it right, but this can be customized via ACON::Question::Base#max_attempts=.

See Validating the Answer.

Sets the validator callback to this block. See Validating the Answer.

See Validating the Answer.

**Examples:**

Example 1 (swift):
```swift
question = ACON::Question(String?).new "What is your name?", nil

helper = self.helper ACON::Helper::Question
name = helper.ask input, output, question
```

Example 2 (swift):
```swift
question = ACON::Question(String?).new "What is your name?", nil
question.trimmable = false

helper = self.helper ACON::Helper::Question
name_with_whitespace_and_newline = helper.ask input, output, question
```

Example 3 (julia):
```julia
question = ACON::Question(String?).new "Tell me a story.", nil
question.multi_line = true
```

Example 4 (swift):
```swift
question = ACON::Question(String?).new "What is your password?.", nil
question.hidden = true
```

---

## module Athena::Framework::Spec::Expectations #

**URL:** https://athenaframework.org/Framework/Spec/Expectations/

**Contents:**
- module Athena::Framework::Spec::Expectations #

ATH::Spec includes a set of custom spec expectations for making it easier to test certain aspects of the application. These expectations are exposed via helper methods within the modules defined within this namespace. See each module for more information.

---

## class Athena::Framework::Exception::Logic inherits Exception #

**URL:** https://athenaframework.org/Framework/Exception/Logic/

**Contents:**
- class Athena::Framework::Exception::Logic inherits Exception #
- Included modules

Represents a code logic error that should lead directly to a fix in your code.

---

## Introduction

**URL:** https://athenaframework.org/Validator/

**Contents:**
- Introduction
- Installation#
- Usage#
  - Basics#
  - Validating Objects#
    - Getters#
  - Custom Constraints#
  - Validation Groups#
  - Sequential Validation#
    - Group Sequence Providers#

The Athena::Validator component provides a robust object/value validation framework.

First, install the component by adding the following to your shard.yml, then running shards install:

Athena::Validator comes with a set of common AVD::Constraints built-in that any project could find useful. When used on its own, the Athena::Validator.validator method can be used to obtain an AVD::Validator::ValidatorInterface instance to validate a given value/object.

A validator accepts a value, and one or more AVD::Constraint to validate the value against. The validator then returns an AVD::Violation::ConstraintViolationListInterface that includes all the violations, if any.

In this case it returns an empty list of violations, meaning the value is valid.

However in the case of the value NOT being valid, the list includes all of the AVD::Violation::ConstraintViolationInterfaces produced during this run. Each violation includes some metadata; such as the related constraint that failed, a machine readable code, a human readable message, any parameters that should be used to render that message, etc. The extra context allows for a lot of flexibility; both in terms of how the error could be rendered or handled.

By default, in addition to any constraint specific arguments, the majority of the constraints have three optional arguments: message, groups, and payload.

validator = AVD.validator # Instantiate a constraint with a custom message, using a placeholder. violations = validator.validate -4, AVD::Constraints::PositiveOrZero.new message: "{{ value }} is not a valid age. A user cannot have a negative age." puts violations # => # -4: # -4 is not a valid age. A user cannot have a negative age. (code: e09e52d0-b549-4ba1-8b4e-420aad76f0de) Customizing the message can be a good way for those consuming the errors to determine WHY a given value is not valid.

Validating arbitrary values against a set of arbitrary constraints can be useful in smaller applications and/or for one off use cases. However to keep in line with our Object Oriented Programming (OOP) principles, we can also validate objects. The object could be either a struct or a class. The only requirements are that the object includes a specific module, AVD::Validatable, and specifies which properties should be validated and against what constraints. The easiest/most common way to do this is via annotations and the Assert alias.

Notice that in this case we do not need to supply the constraints to the #validate method. This is because the validator is able to extract them from the annotations on the properties. An array of constraints can still be supplied, and will take precedence over the constraints defined within the type.

By default if a property's value is another object, the sub object will not be validated. use the AVD::Constraints::Valid constraint if you wish to also validate the sub object. This also applies to arrays of objects.

Another important thing to point out is that no custom DSL is required to define these constraints. Athena::Validator is intended to be a generic validation solution that could be used outside of the Athena ecosystem. However, in order to be able to use the annotation based approach, you need to be able to apply the annotations to the underlying properties. If this is not possible due to how a specific type is implemented, or if you just don't like the annotation syntax, the type can also be configured via code.

The metadata for each type is lazily loaded when an instance of that type is validated, and is only built once. See AVD::Metadata::ClassMetadata for some additional ways to register property constraints.

Constraints can also be applied to getter methods of an object. This allows for dynamic validations based on the return value of the method. For example, say we wanted to assert that a user's name is not the same as their password.

If the built in AVD::Constraints are not sufficient to handle validating a given value/object; custom ones can be defined. Let's make a new constraint that asserts a string contains only alphanumeric characters.

This is accomplished by first defining a new class within the AVD::Constraints namespace that inherits from AVD::Constraint. Then define a Validator struct within our constraint that inherits from AVD::ConstraintValidator that actually implements the validation logic.

The constraint MUST be defined within the AVD::Constraints namespace for implementation reasons. This may change in the future.

We are now able to use this constraint as we would one of the built in ones; either by manually instantiating it, or applying an @[Assert::AlphaNumeric] annotation to a property.

See AVD::ConstraintValidatorInterface for more information on custom validators.

By default when validating an object, all constraints defined on that type will be checked. However, in some cases you may only want to validate the object against some of those constraints. This can be accomplished via assigning each constraint to a validation group, then apply validation against one specific group of constraints.

For example, using our User class from earlier, say we only want to validate certain properties when the user is first created. To do this we can utilize the groups argument that all constraints have.

See AVD::Constraint@validation-groups for some expanded information.

By default, all constraints are validated in a single "batch". I.e. all constraints within the provided group(s) are validated, without regard to if the previous/next constraint is/was (in)valid. However, an AVD::Constraints::GroupSequence can be used to validate batches of constraints in steps. I.e. validate the first "batch" of constraints, and only advance to the next batch if all constraints in that step are valid.

The AVD::Constraints::GroupSequence can be a useful tool for creating efficient validations, but it is quite limiting since the sequence is static on the type. If more flexibility is required the AVD::Constraints::GroupSequence::Provider module can be included into a type. The module allows the object to return the sequence it should use dynamically at runtime.

Alternatively, if you only want to apply constraints sequentially on a single property, the AVD::Constraints::Sequentially constraint can be used to do this in a simpler way.

**Examples:**

Example 1 (yaml):
```yaml
dependencies:
  athena-validator:
    github: athena-framework/validator
    version: ~> 0.4.0
```

Example 2 (markdown):
```markdown
# Obtain a validator instance.
validator = AVD.validator

# Use the validator to validate a value.
violations = validator.validate "foo", AVD::Constraints::NotBlank.new

# The validator returns an empty list of violations, indicating the value is valid.
violations.inspect # => Athena::Validator::Violation::ConstraintViolationList(@violations=[])
```

Example 3 (julia):
```julia
# Using the validator instance from the previous example
violations = validator.validate "", AVD::Constraints::NotBlank.new

violations.inspect # =>
# Athena::Validator::Violation::ConstraintViolationList(
#   @violations=[
#     Athena::Validator::Violation::ConstraintViolation(
#       @cause=nil,
#       @code="0d0c3254-3642-4cb0-9882-46ee5918e6e3",
#       @constraint=#<Athena::Validator::Constraints::NotBlank:0x7f8a7291fed0
#         @allow_nil=false,
#         @groups=["default"],
#         @message="This value should not be blank.",
#         @payload=nil>,
#       @invalid_value_container=Athena::Validator::ValueContainer(String)(@value=""),
#       @message="This value should not be blank.",
#       @message_template="This value should not be blank.",
#       @parameters={"{{ value }}" => ""},
#       @plural=nil,
#       @property_path="",
#       @root_container=Athena::Validator::ValueContainer(String)(@value="")
#     )
#   ]
)

# Both the ConstraintViolationList and ConstraintViolation implement a `#to_s` method.
puts violations # =>
# :
#   This value should not be blank. (code: 0d0c3254-3642-4cb0-9882-46ee5918e6e3)
```

Example 4 (julia):
```julia
validator = AVD.validator

# Instantiate a constraint with a custom message, using a placeholder.
violations = validator.validate -4, AVD::Constraints::PositiveOrZero.new message: "{{ value }} is not a valid age.  A user cannot have a negative age."

puts violations # =>
# -4:
#   -4 is not a valid age.  A user cannot have a negative age. (code: e09e52d0-b549-4ba1-8b4e-420aad76f0de)
```

---

## module Athena::Serializer::ExclusionStrategies::ExclusionStrategyInterface #

**URL:** https://athenaframework.org/Serializer/ExclusionStrategies/ExclusionStrategyInterface/

**Contents:**
- module Athena::Serializer::ExclusionStrategies::ExclusionStrategyInterface #
  - Example#
    - Annotation Configurations#
- Direct including types
- Methods#
  - abstract #skip_property?(metadata : ASR::PropertyMetadataBase, context : ASR::Context) : Bool#

Represents a specific exclusion strategy.

Custom logic can be implemented by defining a type with this interface. It can then be used via ASR::Context#add_exclusion_strategy.

Custom annotations can be defined using ADI.configuration_annotation. These annotations will be exposed at runtime as part of the properties' metadata within exclusion strategies via ASR::PropertyMetadata#annotation_configurations. The main purpose of this is to allow for more advanced annotation based exclusion strategies.

Returns true if a property should NOT be (de)serialized.

**Examples:**

Example 1 (julia):
```julia
struct OddNumberExclusionStrategy
  include Athena::Serializer::ExclusionStrategies::ExclusionStrategyInterface

  # :inherit:
  #
  # Skips serializing odd numbered values
  def skip_property?(metadata : ASR::PropertyMetadataBase, context : ASR::Context) : Bool
    # Don't skip if the value is nil
    return false unless value = (metadata.value)

    # Only skip on serialization, if the value is an number, and if it's odd.
    context.is_a?(ASR::SerializationContext) && value.is_a?(Number) && value.odd?
  end
end

serialization_context = ASR::SerializationContext.new
serialization_context.add_exclusion_strategy OddNumberExclusionStrategy.new

deserialization_context = ASR::DeserializationContext.new
deserialization_context.add_exclusion_strategy OddNumberExclusionStrategy.new

record Values, one : Int32 = 1, two : Int32 = 2, three : Int32 = 3 do
  include ASR::Serializable
end

ASR.serializer.serialize Values.new, :json, serialization_context                                 # => {"two":2}
ASR.serializer.deserialize Values, %({"one":4,"two":5,"three":6}), :json, deserialization_context # => Values(@one=4, @three=6, @two=5)
```

Example 2 (julia):
```julia
# Define an annotation called `IsActiveProperty` that accepts an optional `active` field.
ADI.configuration_annotation IsActiveProperty, active : Bool = true

# Define an exclusion strategy that should skip "inactive" properties.
struct ActivePropertyExclusionStrategy
  include Athena::Serializer::ExclusionStrategies::ExclusionStrategyInterface

  # :inherit:
  def skip_property?(metadata : ASR::PropertyMetadataBase, context : ASR::Context) : Bool
    # Don't skip on deserialization.
    return false if context.direction.deserialization?

    ann_configs = metadata.annotation_configurations

    # Skip if the property has the annotation and it's "inactive".
    ann_configs.has?(IsActiveProperty) && !ann_configs[IsActiveProperty].active
  end
end

record Example, id : Int32, first_name : String, last_name : String, zip_code : Int32 do
  include ASR::Serializable

  @[IsActiveProperty]
  @first_name : String

  @[IsActiveProperty(active: false)]
  @last_name : String

  # Can also be defined as a positional argument.
  @[IsActiveProperty(false)]
  @zip_code : Int32
end

serialization_context = ASR::SerializationContext.new
serialization_context.add_exclusion_strategy ActivePropertyExclusionStrategy.new

ASR.serializer.serialize Example.new(1, "Jon", "Snow", 90210), :json, serialization_context # => {"id":1,"first_name":"Jon"}
```

---

## class Athena::EventDispatcher::EventDispatcher inherits Reference #

**URL:** https://athenaframework.org/EventDispatcher/EventDispatcher/

**Contents:**
- class Athena::EventDispatcher::EventDispatcher inherits Reference #
- Included modules
- Direct known subclasses
- Methods#
  - #dispatch(event : ACTR::EventDispatcher::Event) : ACTR::EventDispatcher::Event#
  - #has_listeners?(event_class : AED::Event.class) : Bool#
  - #has_listeners? : Bool#
  - #listener(callable : AED::Callable) : AED::Callable#
  - #listener(listener : T) : Nil forall T#
  - #listener(callable : AED::Callable, *, priority : Int32) : AED::Callable#

Default implementation of AED::EventDispatcherInterface.

Dispatches the provided event to all listeners listening on that event.

Returns true if this dispatcher has any listeners on the provided event_class.

Returns true if there are any listeners on any event.

Registers the provided callable listener to this dispatcher.

Registers the provided listener instance to this dispatcher.

T is any type that has methods annotated with AEDA::AsEventListener.

Registers the provided callable listener to this dispatcher, overriding its priority with that of the provided priority.

Registers the block as an AED::Callable on the provided event_class, optionally with the provided priority and/or name.

Returns an Array(AED::Callable) for all listeners on the provided event_class.

Returns a hash of all registered listeners as a Hash(AED::Event.class, Array(AED::Callable)).

Deregisters the provided callable from this dispatcher.

The callable may be one retrieved via either #listeners method.

Deregisters listeners based on the provided listener from this dispatcher.

T is any type that has methods annotated with AEDA::AsEventListener.

---

## module Athena::Contracts::EventDispatcher #

**URL:** https://athenaframework.org/Contracts/EventDispatcher/

**Contents:**
- module Athena::Contracts::EventDispatcher #

Contracts that relate to the Athena::EventDispatcher component.

---

## class Athena::Validator::Constraints::IsTrue inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/IsTrue/

**Contents:**
- class Athena::Validator::Constraints::IsTrue inherits Athena::Validator::Constraint #
- Configuration#
  - Optional Arguments#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Constants#
  - NOT_TRUE_ERROR = "beabd93e-3673-4dfc-8796-01bd1504dd19"#
- Constructors#

Validates that a value is true.

Type: String Default: This value should be true.

The message that will be shown if the value is not true.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class Post
  include AVD::Validatable

  def initialize(@is_published : Bool); end

  @[Assert::IsTrue]
  property is_published : Bool
end
```

---

## module Athena::Console::Formatter::OutputStyleInterface #

**URL:** https://athenaframework.org/Console/Formatter/OutputStyleInterface/

**Contents:**
- module Athena::Console::Formatter::OutputStyleInterface #
  - Custom Styles#
    - Global Custom Styles#
  - Inline Styles#
  - Clickable Links#
- Direct including types
- Methods#
  - abstract #add_option(option : Colorize::Mode) : Nil#
  - abstract #apply(text : String) : String#
  - abstract #background=(background : Colorize::Color)#

Output styles represent reusable formatting information that can be used when formatting output messages. Athena::Console comes bundled with a few common styles including:

Whenever you output text via an ACON::Output::Interface, you can surround the text with tags to color its output. For example:

Custom styles can also be defined/used:

You can also make your style global by extending ACON::Application and adding it within the #configure_io method:

Styles can also be defined inline when printing a message:

Commands can use the special href tag to display links within the console.

If your terminal supports it, you would be able to click the text and have it open in your default browser. Otherwise, you will see it as regular text.

Adds a text mode to self.

Applies self to the provided text.

Sets the background color of self.

Sets the foreground color of self.

Removes a text mode to self.

**Examples:**

Example 1 (markdown):
```markdown
# Green text
output.puts "<info>foo</info>"

# Yellow text
output.puts "<comment>foo</comment>"

# Black text on a cyan background
output.puts "<question>foo</question>"

# White text on a red background
output.puts "<error>foo</error>"
```

Example 2 (typescript):
```typescript
my_style = ACON::Formatter::OutputStyle.new :red, "#f87b05", Colorize::Mode[:bold, :underline]
output.formatter.set_style "fire", my_style

output.puts "<fire>foo</>"
```

Example 3 (php):
```php
class MyCustomApplication < ACON::Application
  protected def configure_io(input : ACON::Input::Interface, output : ACON::Output::Interface) : Nil
    super

    my_style = ACON::Formatter::OutputStyle.new :red, "#f87b05", Colorize::Mode[:bold, :underline]
    output.formatter.set_style "fire", my_style
  end
end
```

Example 4 (julia):
```julia
# Using named colors
output.puts "<fg=green>foo</>"

# Using hexadecimal colors
output.puts "<fg=#c0392b>foo</>"

# Black text on a cyan background
output.puts "<fg=black;bg=cyan>foo</>"

# Bold text on a yellow background
output.puts "<bg=yellow;options=bold>foo</>"

# Bold text with underline.
output.puts "<options=bold,underline>foo</>"
```

---

## module Athena::Contracts::EventDispatcher::StoppableEvent #

**URL:** https://athenaframework.org/Contracts/EventDispatcher/StoppableEvent/

**Contents:**
- module Athena::Contracts::EventDispatcher::StoppableEvent #
- Direct including types
- Methods#
  - #propagate? : Bool#
  - #stop_propagation : Nil#

An ACTR::EventDispatcher::Event whose processing may be interrupted when the event has been handled.

ACTR::EventDispatcher::Interface implementations MUST check to determine if an ACTR::EventDispatcher::Event is marked as stopped after each listener is called. If it is, then the dispatcher should return immediately without calling any further listeners.

If future listeners should be executed.

Prevent future listeners from executing once any listener calls #stop_propagation.

---

## module Athena::ImageSize #

**URL:** https://athenaframework.org/ImageSize/top_level/

**Contents:**
- module Athena::ImageSize #
- Constants#
  - VERSION = "0.1.4"#
- Class methods#
  - .dpi : Float64#
  - .dpi=(dpi : Float64)#

Allows measuring the size of various image formats.

Represents the DPI (Dots Per Inch) used to calculate dimensions of AIS::Image::Format::SVG images, defaulting to 72.0.

Represents the DPI (Dots Per Inch) used to calculate dimensions of AIS::Image::Format::SVG images, defaulting to 72.0.

---

## struct Athena::Framework::Listeners::View inherits Struct #

**URL:** https://athenaframework.org/Framework/Listeners/View/

**Contents:**
- struct Athena::Framework::Listeners::View inherits Struct #
- Constructors#
  - .new(view_handler : ATH::View::ViewHandlerInterface)#
- Methods#
  - #on_view(event : ATH::Events::View) : Nil#

Listens on the ATH::Events::View event to convert a non ATH::Response into an ATH::Response. Allows creating format agnostic controllers by allowing them to return format agnostic data that is later used to render the content in the expected format.

See the Getting Started docs for more information.

---

## struct Athena::ImageSize::Image inherits Struct #

**URL:** https://athenaframework.org/ImageSize/Image/

**Contents:**
- struct Athena::ImageSize::Image inherits Struct #
- Constructors#
  - .from_file_path(path : String | Path) : self#
  - .from_io(io : IO) : self#
- Class methods#
  - .from_file_path?(path : String | Path) : self | Nil#
  - .from_io?(io : IO) : self | Nil#
- Methods#
  - #bits : Int32 | ::Nil#
  - #channels : Int32 | ::Nil#

Represents information related to a processed image.

Attempts to process the image at the provided path, raising an exception if either the images fails to process or is an unsupported format.

Attempts to process the image from the provided io, raising an exception if either the images fails to process or is an unsupported format.

Attempts to process the image at the provided path, returning nil if either the images fails to process or is an unsupported format.

Attempts to process the image from the provided io, returning nil if either the images fails to process or is an unsupported format.

Returns the number of bits per pixel within this image, if available.

Returns the number of channels within this image, if available.

Returns the format of this image.

Returns the width of this image in pixels.

Returns a tuple of this images size in the format of {width, height}.

Returns the width of this image in pixels.

**Examples:**

Example 1 (markdown):
```markdown
pp AIS::Image.from_file_path "spec/images/jpeg/436x429_8_3.jpeg" # =>
# Athena::ImageSize::Image(
# @bits=8,
# @channels=3,
# @format=JPEG,
# @height=429,
# @width=436)
```

---

## module Athena::Clock::Aware #

**URL:** https://athenaframework.org/Clock/Aware/

**Contents:**
- module Athena::Clock::Aware #
- Methods#
  - #clock=(clock : ACLK::Interface | Nil)#
  - #now : ::Time#

This module can be included to make a type time aware without having to alter its constructor.

**Examples:**

Example 1 (swift):
```swift
class Example
  include Athena::Clock::Aware

  def expired?
    self.now > some_time_instance
  end
end

# Will use a `Athena::Clock` instance if a custom one is not set on the instance.
example = Example.new

# Or if so desired, explicitly set custom implementation.
my_clock = MySpecialClock.new
custom_example = Example.new
custom_example.clock = my_clock
```

---

## Athena::Framework::Bundle::Schema::FormatListener#

**URL:** https://athenaframework.org/Framework/Bundle/Schema/FormatListener/

**Contents:**
- Athena::Framework::Bundle::Schema::FormatListener#
- Configuration Properties
  - enabled#
  - rules#
    - Example#
    - path#
    - host#
    - methods#
    - priorities#
    - fallback_format#

Configuration related to the ATH::Listeners::Format listener.

If enabled, the rules are used to determine the best format for the current request based on its Accept header.

ATH::Request::FORMATS is used to map the request's MIME type to its format.

If false, the format listener will be disabled and not included in the resulting binary.

The rules used to determine the best format. Rules should be defined in priority order, with the highest priority having index 0.

Assuming an accept header with the value text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,application/json, a request made to /foo from the api.example.com hostname; the request format would be json. If the request was not made from that hostname; the request format would be html. The rules can be as complex or as simple as needed depending on the use case of your application.

This property consists of an array of objects with the following properties:

Use this rules configuration if the request's path matches the regex.

Use this rules configuration if the request's hostname matches the regex.

Array(String) | ::Nil

Use this rules configuration if the request's method is one of these configured methods.

Array(String) | ::Nil

Defines the order of media types the application prefers. If a format is provided instead of a media type, the format is converted into a list of media types matching the format.

If nil and the path, host, or methods did not match the current request, skip this rule and try the next one. If set to a format string, use that format. If false, return a 406 instead of considering the next rule.

If true, disables the format listener for this and any following rules. Can be used as a way to enable the listener on a subset of routes within the application.

Determines if the accept header, or route path _format parameter takes precedence. For example, say there is a routed defined as /foo.{_format}. When false, the format from _format placeholder is checked last against the defined priorities. Whereas if true, it would be checked first.

**Examples:**

Example 1 (json):
```json
ATH.configure({
  framework: {
    format_listener: {
      enabled: true,
      rules:   [
        {priorities: ["json", "xml"], host: /api\.example\.com/, fallback_format: "json"},
        {path: /^\/image/, priorities: ["jpeg", "gif"], fallback_format: false},
        {path: /^\/admin/, priorities: ["xml", "html"]},
        {priorities: ["text/html", "*/*"], fallback_format: "html"},
      ],
    },
  },
})
```

---

## class Athena::Validator::Constraints::NotNil inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/NotNil/

**Contents:**
- class Athena::Validator::Constraints::NotNil inherits Athena::Validator::Constraint #
- Configuration#
  - Optional Arguments#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Constants#
  - IS_NIL_ERROR = "c7e77b14-744e-44c0-aa7e-391c69cc335c"#
- Constructors#

Validates that a value is not nil.

Due to Crystal's static typing, when validating objects the property's type must be nilable, otherwise nil is inherently not allowed due to the compiler's type checking.

Type: String Default: This value should not be null.

The message that will be shown if the value is nil.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class Post
  include AVD::Validatable

  def initialize(@title : String?, @description : String?); end

  @[Assert::NotNil]
  property title : String?

  @[Assert::NotNil]
  property description : String?
end
```

---

## module Athena::Framework::ErrorRendererInterface #

**URL:** https://athenaframework.org/Framework/ErrorRendererInterface/

**Contents:**
- module Athena::Framework::ErrorRendererInterface #
- Direct including types
- Methods#
  - abstract #render(exception : ::Exception) : ATH::Response#

An ATH::ErrorRendererInterface converts an ::Exception into an ATH::Response.

By default, exceptions are JSON serialized via ATH::ErrorRenderer. However, it can be overridden to allow rendering errors differently, such as via HTML.

Renders the given exception into an ATH::Response.

**Examples:**

Example 1 (html):
```html
require "athena"

# Alias this service to be used when the `ATH::ErrorRendererInterface` type is encountered.
@[ADI::Register]
@[ADI::AsAlias]
struct Athena::Framework::CustomErrorRenderer
  include Athena::Framework::ErrorRendererInterface

  # :inherit:
  def render(exception : ::Exception) : ATH::Response
    if exception.is_a? ATH::Exception::HTTPException
      status = exception.status
      headers = exception.headers
    else
      status = HTTP::Status::INTERNAL_SERVER_ERROR
      headers = HTTP::Headers.new
    end

    body = <<-HTML
      <html>
        <head>
          <title>Uh oh</title>
        </head>
        <body>
          <h1>Uh oh, something went wrong</h1>
        </body>
      </html>
    HTML

    headers["content-type"] = "text/html"

    ATH::Response.new body, status, headers
  end
end

class TestController < ATH::Controller
  get "/" do
    raise "some error"
  end
end

ATH.run

# GET / # =>   <html><head><title>Uh oh</title></head><body><h1>Uh oh, something went wrong</h1></body></html>
```

---

## module Athena::DependencyInjection #

**URL:** https://athenaframework.org/DependencyInjection/top_level/

**Contents:**
- module Athena::DependencyInjection #
- Constants#
  - VERSION = "0.4.4"#
- Class methods#
  - .container : ADI::ServiceContainer#
- Macros#
  - add_compiler_pass(pass, type = nil, priority = nil)#
  - bind(key, value)#
        - Example#
  - configuration_annotation#

Robust dependency injection service container framework.

Returns the ADI::ServiceContainer for the current fiber.

Adds a compiler pass, optionally of a specific type and priority (default 0).

This feature is intended for internal/advanced use and, for now, comes with limited public documentation.

Allows binding a value to a key in order to enable auto registration of that value.

Bindings allow scalar values, or those that could not otherwise be handled via service aliases, to be auto registered. This allows those arguments to be defined once and reused, as opposed to using named arguments to manually specify them for each service.

Bindings can also be declared with a type restriction to allow taking the type restriction of the argument into account. Typed bindings are always checked first as the most specific type is always preferred. If no typed bindings match the argument's type, then the last defined untyped bindings is used.

Registers a configuration annotation with the provided name. Defines a configuration record with the provided args, if any, that represents the possible arguments that the annotation accepts. May also be used with a block to add custom methods to the configuration record.

The logic to actually do the resolution of the annotations must be handled in the owning shard. Athena::DependencyInjection only defines the common logic that each implementation can use. See ADI::AnnotationConfigurations for more information.

Primary entrypoint for configuring ADI::Extension::Schemas.

Registers an extension ADI::Extension::Schema with the provided name.

**Examples:**

Example 1 (julia):
```julia
module ValueInterface; end

@[ADI::Register(_value: 1, name: "value_one")]
@[ADI::Register(_value: 2, name: "value_two")]
@[ADI::Register(_value: 3, name: "value_three")]
record ValueService, value : Int32 do
  include ValueInterface
end

# Untyped bindings
ADI.bind api_key, ENV["API_KEY"]
ADI.bind config, {id: 12_i64, active: true}
ADI.bind static_value, 123
ADI.bind odd_values, ["@value_one", "@value_three"]
ADI.bind value_arr, [true, true, false]

# Typed bindings
ADI.bind value_arr : Array(Int32), [1, 2, 3]
ADI.bind value_arr : Array(Float64), [1.0, 2.0, 3.0]

@[ADI::Register(public: true)]
record BindingClient,
  api_key : String,
  config : NamedTuple(id: Int64, active: Bool),
  static_value : Int32,
  odd_values : Array(ValueInterface)

@[ADI::Register(public: true)]
record IntArr, value_arr : Array(Int32)

@[ADI::Register(public: true)]
record FloatArr, value_arr : Array(Float64)

@[ADI::Register(public: true)]
record BoolArr, value_arr : Array(Bool)

ADI.container.binding_client # =>
# BindingClient(
#  @api_key="123ABC",
#  @config={id: 12, active: true},
#  @static_value=123,
#  @odd_values=[ValueService(@value=1), ValueService(@value=3)])

ADI.container.int_arr   # => IntArr(@value_arr=[1, 2, 3])
ADI.container.float_arr # => FloatArr(@value_arr=[1.0, 2.0, 3.0])
ADI.container.bool_arr  # => BoolArr(@value_arr=[true, true, false])
```

Example 2 (typescript):
```typescript
# Defines an annotation without any arguments.
ADI.configuration_annotation Secure

# Defines annotation with a required and optional argument.
# The default value will be used if that key isn't supplied in the annotation.
ADI.configuration_annotation SomeAnn, id : Int32, debug : Bool = true

# A block can be used to define custom methods on the configuration object.
ADI.configuration_annotation CustomAnn, first_name : String, last_name : String do
  def name : String
    "#{@first_name} #{@last_name}"
  end
end
```

---

## class Athena::MIME::Email inherits Athena::MIME::Message #

**URL:** https://athenaframework.org/MIME/Email/

**Contents:**
- class Athena::MIME::Email inherits Athena::MIME::Message #
- Direct known subclasses
- Methods#
  - #add_bcc(*addresses : AMIME::Address | String) : self#
  - #add_cc(*addresses : AMIME::Address | String) : self#
  - #add_from(*addresses : AMIME::Address | String) : self#
  - #add_part(part : AMIME::Part::Data) : self#
  - #add_reply_to(*addresses : AMIME::Address | String) : self#
  - #add_to(*addresses : AMIME::Address | String) : self#
  - #attach(body : String | IO, name : String | Nil = nil, content_type : String | Nil = nil) : self#

Provides a high-level API for creating an email.

Appends the provided addresses to the list of current bcc addresses.

Appends the provided addresses to the list of current cc addresses.

Appends the provided addresses to the list of current from addresses.

Adds the provided part as an email attachment. Consider using #attach or #embed or one of their variants to provide a simpler API.

Appends the provided addresses to the list of current reply-to addresses.

Appends the provided addresses to the list of current to addresses.

Adds an attachment with the provided body, optionally with the provided name and content_type.

Attaches the file at the provided path as an attachment, optionally with the provided name and content_type.

Returns an array of AMIME::Part::Data representing the email's attachments.

Returns the bcc addresses of this email, or an empty array if none were set.

Sets the cc addresses of this email to the provided addresses, overriding any previously added ones.

Returns the MIME representation of this email.

Returns the cc addresses of this email, or an empty array if none were set.

Sets the cc addresses of this email to the provided addresses, overriding any previously added ones.

Sets the date of this email to the provided date.

Returns the date of this email, or nil if none is set.

Adds an embedded attachment with the provided body, optionally with the provided name and content_type.

Embeds the file at the provided path as an attachment, optionally with the provided name and content_type.

Asserts that this message is in a valid state to be sent, raising an AMIME::Exception::Logic error if not.

Returns the from addresses of this email, or an empty array if none were set.

Sets the from addresses of this email to the provided addresses, overriding any previously added ones.

Sets the HTML content of this email to the provided body, optionally with the provided charset.

Returns the HTML content of this email.

Returns the charset of the #html_body for this email.

Sets the priority of this email to the provided priority.

Returns the priority of this email.

Returns the reply-to addresses of this email, or an empty array if none were set.

Sets the reply-to addresses of this email to the provided addresses, overriding any previously added ones.

Sets the return path of this email to the provided address.

Returns the return path of this email, or nil if none is set.

Sets the sender of this email to the provided address.

Returns the sender of this email, or nil if none is set.

Sets the subject of this email to the provided subject.

Returns the subject of this email, or nil if none is set.

Sets the textual content of this email to the provided body, optionally with the provided charset.

Returns the textual content of this email.

Returns the charset of the #text_body for this email.

Returns the to addresses of this email, or an empty array if none were set.

Sets the to addresses of this email to the provided addresses, overriding any previously added ones.

**Examples:**

Example 1 (swift):
```swift
email = AMIME::Email
  .new
  .from("[email protected]")
  .to("[email protected]")
  .cc("[email protected]")
  .bcc("[email protected]")
  .reply_to("[email protected]")
  .priority(:high)
  .subject("Important Notification")
  .text("Lorem ipsum...")
  .html("<h1>Lorem ipsum</h1> <p>...</p>")
  .attach_from_path("/path/to/file.pdf", "my-attachment.pdf")
  .embed_from_path("/path/to/logo.png")

# ...
```

---

## annotation Athena::DependencyInjection::Autoconfigure #

**URL:** https://athenaframework.org/DependencyInjection/Autoconfigure/

**Contents:**
- annotation Athena::DependencyInjection::Autoconfigure #
    - Example#

Applies the provided configuration to any registered service of the type the annotation is applied to. E.g. a module interface, or a parent type.

The following values may be auto-configured:

Checkout ADI::AutoconfigureTag and ADI::TaggedIterator for a simpler way of handling tags.

**Examples:**

Example 1 (julia):
```julia
@[ADI::Autoconfigure(bind: {id: 123}, public: true)]
module SomeInterface; end

@[ADI::Register]
record One do
  include SomeInterface
end

@[ADI::Register]
record Two, id : Int32 do
  include SomeInterface
end

# The services are only accessible like this since they were auto-configured to be public.
ADI.container.one # => One()

# `123` is used as it was bound to all services that include `SomeInterface`.
ADI.container.two # => Two(@id=123)
```

---

## annotation Athena::Serializer::Annotations::IgnoreOnDeserialize #

**URL:** https://athenaframework.org/Serializer/Annotations/IgnoreOnDeserialize/

**Contents:**
- annotation Athena::Serializer::Annotations::IgnoreOnDeserialize #
  - Example#

Indicates that a property should not be set on deserialization, but should be serialized.

**Examples:**

Example 1 (json):
```json
class Example
  include ASR::Serializable

  property name : String

  @[ASRA::IgnoreOnDeserialize]
  property password : String?
end

obj = ASR.serializer.deserialize Example, %({"name":"Jim","password":"monkey123"}), :json

obj.password # => nil
obj.name     # => Jim

obj.password = "foobar"

ASR.serializer.serialize obj, :json # => {"name":"Jim","password":"foobar"}
```

---

## class Athena::Clock::Monotonic inherits Reference #

**URL:** https://athenaframework.org/Clock/Monotonic/

**Contents:**
- class Athena::Clock::Monotonic inherits Reference #
- Included modules
- Constructors#
  - .new(location : Time::Location | Nil = nil)#
- Methods#
  - #in_location(location : Time::Location) : self#
  - #now : Time#
  - #sleep(span : Time::Span) : Nil#

The monotonic clock is primarily intended to be use to measure time, such as for a stopwatch. It's measurements are unaffected by inconsistencies sometimes introduced by the system clock. See Measuring Time for more information.

Returns a new clock instance set to the provided location.

Returns the current time as determined by the clock.

Sleeps for the provided span of time.

---

## class Athena::Framework::Events::Exception inherits Athena::EventDispatcher::Event #

**URL:** https://athenaframework.org/Framework/Events/Exception/

**Contents:**
- class Athena::Framework::Events::Exception inherits Athena::EventDispatcher::Event #
- Included modules
- Constructors#
  - .new(request : ATH::Request, exception : ::Exception)#
- Methods#
  - #exception : ::Exception#
  - #exception=(exception : ::Exception)#

Emitted when an exception occurs. See ATH::Exception for more information on how exception handling works in Athena.

This event can be listened on to recover from errors or to modify the exception before it's rendered.

See the Getting Started docs for more information.

The ::Exception associated with self.

Can be replaced by an ATH::Listeners::Error.

The ::Exception associated with self.

Can be replaced by an ATH::Listeners::Error.

---

## module Athena::Framework::View::FormatHandlerInterface #

**URL:** https://athenaframework.org/Framework/View/FormatHandlerInterface/

**Contents:**
- module Athena::Framework::View::FormatHandlerInterface #
- Constants#
  - TAG = "athena.format_handler"#
- Methods#
  - abstract #call(view_handler : ATH::View::ViewHandlerInterface, view : ATH::View, request : ATH::Request, format : String) : ATH::Response#
  - abstract #format : String#

Represents custom logic that should be applied for a specific format in order to render an ATH::View into an ATH::Response that is not handled by default by Athena. E.g. HTML.

The implementation for HTML for example could use .to_s as depicted here, or utilize a templating engine, possibly taking advantage of custom annotations to allow specifying the related template name.

Responsible for returning an ATH::Response for the provided view and request in the provided format.

The ATH::View::ViewHandlerInterface is also provided to ease response creation.

Returns the format that self handles.

The format must be registered with the ATH::Request::FORMATS hash; either as a built in format, or a custom one that has registered via ATH::Request.register_format.

**Examples:**

Example 1 (typescript):
```typescript
# Register our handler as a service.
@[ADI::Register]
class HTMLFormatHandler
  # Implement the interface.
  include Athena::Framework::View::FormatHandlerInterface

  # :inherit:
  #
  # Turn the provided data into a response that can be returned to the client.
  def call(view_handler : ATH::View::ViewHandlerInterface, view : ATH::ViewBase, request : ATH::Request, format : String) : ATH::Response
    ATH::Response.new "<h1>#{view.data}</h1>", headers: HTTP::Headers{"content-type" => "text/html"}
  end

  # :inherit:
  #
  # Specify that `self` handles the `HTML` format.
  def format : String
    "html"
  end
end
```

---

## annotation Athena::Serializer::Annotations::ReadOnly #

**URL:** https://athenaframework.org/Serializer/Annotations/ReadOnly/

**Contents:**
- annotation Athena::Serializer::Annotations::ReadOnly #
  - Example#

Indicates that a property is read-only and cannot be set during deserialization.

The property must be nilable, or have a default value.

**Examples:**

Example 1 (json):
```json
class Example
  include ASR::Serializable

  property name : String

  @[ASRA::ReadOnly]
  property password : String?
end

obj = ASR.serializer.deserialize Example, %({"name":"Fred","password":"password1"}), :json

obj.name     # => "Fred"
obj.password # => nil
```

---

## class Athena::Framework::Events::Request inherits Athena::EventDispatcher::Event #

**URL:** https://athenaframework.org/Framework/Events/Request/

**Contents:**
- class Athena::Framework::Events::Request inherits Athena::EventDispatcher::Event #
- Included modules

Emitted very early in the request's life-cycle; before the corresponding ATH::Action (if any) has been resolved.

This event can be listened on in order to:

If your listener logic requires that the the corresponding ATH::Action has been resolved, use ATH::Events::Action instead.

See the Getting Started docs for more information.

---

## struct Athena::MIME::Encoder::EightBitContent inherits Struct #

**URL:** https://athenaframework.org/MIME/Encoder/EightBitContent/

**Contents:**
- struct Athena::MIME::Encoder::EightBitContent inherits Struct #
- Included modules
- Constructors#
  - .new#
- Methods#
  - #encode(input : String, charset : String | Nil = "UTF-8", first_line_offset : Int32 = 0, max_line_length : Int32 | Nil = nil) : String#
  - #encode(input : IO, max_line_length : Int32 | Nil = nil) : String#
  - #initialize#
  - #name : String#

A content encoder based on the 8bit spec.

Returns an encoded version of the provided input.

first_line_offset may optionally be used depending on the exact implementation if the first line needs to be shorter. max_line_length may optionally be used depending on the exact implementation to customize the max length of each line.

Returns an string representing the encoded contents of the provided input IO. With lines optionally limited to max_line_length, depending on the underlying implementation.

Returns the name of this encoder for use within the content-transfer-encoding header.

---

## class Athena::Console::Input::Option inherits Reference #

**URL:** https://athenaframework.org/Console/Input/Option/

**Contents:**
- class Athena::Console::Input::Option inherits Reference #
- Constructors#
  - .new(name : String, shortcut : String | Enumerable(String) | Nil = nil, value_mode : ACON::Input::Option::Value = :none, description : String = "", default = nil, suggested_values : Array(String) | Proc(ACON::Completion::Input, Array(String)) | Nil = nil)#
- Methods#
  - #==(other : self)#
  - #accepts_value? : Bool#
  - #complete(input : ACON::Completion::Input, suggestions : ACON::Completion::Suggestions) : Nil#
  - #default(type : T.class) : T forall T#
  - #default#
  - #default=(default = nil) : Nil#

Represents a value (or array of ) provided to a command as optional un-ordered flags that be setup to accept a value, or represent a boolean flag. Options can also have an optional shortcut, default value, and/or description.

Options are specified with two dashes, or one dash when using the shortcut. For example, ./console test --yell --dir=src -v. We have one option representing a boolean value, providing a value to another, and using the shortcut of another.

Options can be added via the ACON::Command#option method, or by instantiating one manually as part of an ACON::Input::Definition. The value of the option could then be accessed via one of the ACON::Input::Interface#option overloads.

See ACON::Input::Interface for more examples on how arguments/options are parsed, and how they can be accessed.

Returns true if this reference is the same as other. Invokes same?.

Returns true if self is able to accept a value, otherwise false.

Determines what values should be added to the possible suggestions based on the provided input.

Returns the default value of self, if any, converted to the provided type.

Returns the default value of self, if any.

Sets the default value of self.

Returns the description of self.

Returns true if this option is able to suggest values, otherwise false

Returns true if self is a required argument, otherwise false. ameba:disable Naming/PredicateName

Returns the name of self.

Returns true if self is negatable, otherwise false.

Returns the shortcut of self, if any.

Returns the ACON::Input::Option::Value of self.

Returns true if self accepts a value but is optional, otherwise false.

Returns true if self accepts a value and it is required, otherwise false.

---

## module Athena::Contracts #

**URL:** https://athenaframework.org/Contracts/top_level/

**Contents:**
- module Athena::Contracts #
- Constants#
  - VERSION = "0.1.0"#

A set of robust/battle-tested types and interfaces to achieve loose coupling and interoperability.

---

## enum Athena::Console::Output::Type #

**URL:** https://athenaframework.org/Console/Output/Type/

**Contents:**
- enum Athena::Console::Output::Type #
- Members#
  - NORMAL = 0#
  - RAW = 1#
  - PLAIN = 2#
- Methods#
  - #normal?#
  - #plain?#
  - #raw?#

Determines how a message should be printed.

When you output a message via ACON::Output::Interface#puts or ACON::Output::Interface#print, they also provide a way to set the output type it should be printed:

Normal output, with any styles applied to format the text.

Output style tags as is without formatting the string.

Strip any style tags and only output the actual text.

Returns true if this enum value equals NORMAL

Returns true if this enum value equals PLAIN

Returns true if this enum value equals RAW

**Examples:**

Example 1 (swift):
```swift
protected def execute(input : ACON::Input::Interface, output : ACON::Output::Interface) : ACON::Command::Status
  output.puts "Some Message", output_type: :raw

  ACON::Command::Status::SUCCESS
end
```

---

## class Athena::Console::Helper::Formatter inherits Athena::Console::Helper #

**URL:** https://athenaframework.org/Console/Helper/Formatter/

**Contents:**
- class Athena::Console::Helper::Formatter inherits Athena::Console::Helper #
- Methods#
  - #format_block(messages : String | Enumerable(String), style : String, large : Bool = false)#
  - #format_section(section : String, message : String, style : String = "info") : String#
  - #truncate(message : String, length : Int, suffix : String = "...") : String#

Provides additional ways to format output messages than ACON::Formatter::OutputStyle can do alone, such as:

The provided methods return a String which could then be passed to ACON::Output::Interface#print or ACON::Output::Interface#puts.

Prints the provided messages in a block formatted according to the provided style, with a total width a bit more than the longest line.

The large options adds additional padding, one blank line above and below the messages, and 2 more spaces on the left and right.

Prints the provided message in the provided section. Optionally allows setting the style of the section.

Truncates the provided message to be at most length characters long, with the optional suffix appended to the end.

If length is negative, it will start truncating from the end.

**Examples:**

Example 1 (unknown):
```unknown
output.puts formatter.format_block({"Error!", "Something went wrong"}, "error", true)
```

Example 2 (json):
```json
[SomeSection] Here is some message related to that section
```

Example 3 (unknown):
```unknown
output.puts formatter.format_section "SomeSection", "Here is some message related to that section"
```

Example 4 (javascript):
```javascript
message = "This is a very long message, which should be truncated"
truncated_message = formatter.truncate message, 7
output.puts truncated_message # => This is...
```

---

## module Athena::Framework::View::ConfigurableViewHandlerInterface #

**URL:** https://athenaframework.org/Framework/View/ConfigurableViewHandlerInterface/

**Contents:**
- module Athena::Framework::View::ConfigurableViewHandlerInterface #
- Included modules
- Direct including types
- Methods#
  - abstract #emit_nil=(emit_nil : Bool) : Nil#
  - abstract #serialization_groups=(groups : Enumerable(String)) : Nil#
  - abstract #serialization_version=(version : SemanticVersion) : Nil#

Specialized ATH::View::ViewHandlerInterface that allows controlling various serialization ATH::View::Context aspects dynamically.

Determines if properties with nil values should be emitted.

Sets the groups that should be used as part of ASR::ExclusionStrategies::Groups.

Sets the version that should be used as part of ASR::ExclusionStrategies::Version.

---

## class Athena::Console::Helper::AthenaQuestion inherits Athena::Console::Helper::Question #

**URL:** https://athenaframework.org/Console/Helper/AthenaQuestion/

**Contents:**
- class Athena::Console::Helper::AthenaQuestion inherits Athena::Console::Helper::Question #

Extension of ACON::Helper::Question that provides more structured output.

See ACON::Style::Athena.

---

## class Athena::Validator::Constraints::IP inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/IP/

**Contents:**
- class Athena::Validator::Constraints::IP inherits Athena::Validator::Constraint #
- Configuration#
  - Optional Arguments#
    - version#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Constants#
  - INVALID_IP_ERROR = "326b0aa4-3871-404d-986d-fe3e6c82005c"#

Validates that a value is a valid IP address. By default validates the value as an IPv4 address, but can be customized to validate IPv6s, or both. The underlying value is converted to a string via #to_s before being validated.

As with most other constraints, nil and empty strings are considered valid values, in order to allow the value to be optional. If the value is required, consider combining this constraint with AVD::Constraints::NotBlank.

Type: AVD::Constraints::IP::Version Default: AVD::Constraints::IP::Version::V4

Defines the pattern that should be used to validate the IP address.

Type: String Default: This is not a valid IP address.

The message that will be shown if the value is not a valid IP address.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class Machine
  include AVD::Validatable

  def initialize(@ip_address : String); end

  @[Assert::IP]
  property ip_address : String
end
```

---

## class Athena::Console::Helper::ProgressBar inherits Reference #

**URL:** https://athenaframework.org/Console/Helper/ProgressBar/

**Contents:**
- class Athena::Console::Helper::ProgressBar inherits Reference #
    - Progressing#
    - Controlling Rendering#
  - Customizing#
    - Built-in Formats#
    - Custom Formats#
    - Bar Settings#
    - Custom Placeholders#
    - Custom Messages#
  - Multiple Progress Bars#

When executing longer-running commands, it can be helpful to show progress information that updates as the command runs:

Consider using ACON::Style::Athena to display a progress bar.

The ProgressBar helper can be used to progress information to any ACON::Output::Interface:

A progress bar can also be created without a required number of units, in which case it will just act as a throbber. However, #max_steps= can be called at any point to either set, or increase the required number of units. E.g. if its only known after performing some calculations, or additional work is needed such that the original value is not invalid.

Consider using an ACON::Helper::ProgressIndicator instead of a progress bar for this use case.

Be sure to call #finish when the task completes to ensure the progress bar is refreshed with a 100% completion.

By default the progress bar will write its output to STDERR, however this can be customized by using an ACON::Output::IO explicitly.

If the progress information is stored within an Enumerable type, the #iterate method can be used to start, advance, and finish the progress bar automatically, yielding each item in the collection:

Which would output: 0/2 [>---------------------------] 0% 1/2 [==============>-------------] 50% 2/2 [============================] 100%

Iterator types are also supported, but need the max value provided explicitly via the second argument to #iterate if known.

While the #advance method can be used to move the progress bar ahead by a specific number of steps, the current step can be set explicitly via #progress=.

It is also possible to start the progress bar at a specific step, which is useful when resuming some long-standing task:

The progress can also be regressed (stepped backwards) by providing #advance a negative value.

If available, ANCI Escape Codes are used to handle the rendering of the progress bar, otherwise updates are added as new lines. #minimum_seconds_between_redraws= can be used to prevent the output being flooded. #redraw_frequency= can be used to to redraw every N iterations. By default, redraw frequency is 100ms or 10% of your #max_steps.

The progress bar comes with a few built-in formats based on the ACON::Output::Verbosity the command was executed with:

If a command called with ACON::Output::Verbosity::QUIET, the progress bar will not be displayed.

The format may also be set explicitly in code via:

While the built-in formats are sufficient for most use cases, custom ones may also be defined:

Which would set the format to only display the progress bar itself:

A progress bar format is a string that contains specific placeholders (a name enclosed with the % character); the placeholders are replaced based on the current progress of the bar. The built-in placeholders include:

For example, the format string for ACON::Helper::ProgressBar::Format::NORMAL is " %current% [%bar%] %elapsed:6s%". Individual placeholders can have their formatting tweaked by anything that sprintf supports by separating the name of the placeholder with a :. The part after the colon will be passed to sprintf.

If a format should be used across an entire application, they can be registered globally via .set_format_definition:

It is almost always better to override the built-in formats in order to automatically vary the display based on the verbosity the command is being ran with.

When creating a custom format, be sure to also define a _nomax variant if it is using a placeholder that is only available if #max_steps is defined.

The format will automatically be set to minimal_nomax if the bar does not have a maximum number of steps.

A format can contain any valid ANSI codes, or any ACON::Formatter::OutputStyleInterface markup.

A format may also span multiple lines, which can be useful to also display contextual information (like the first example).

The bar placeholder is a bit special in that all of the characters used to display it can be customized:

Just like the format, custom placeholders may also be defined. This can be useful to have a common way of displaying some sort of application specific information between multiple progress bars:

From here it could then be used in a format string as %remaining_steps% just like any other placeholder. .set_placeholder_formatter registers the format globally, while #set_placeholder_formatter would set it on a specific progress bar.

While there is a built-in message placeholder that can be set via #set_message, none of the built-in formats include it. As such, before displaying these messages, a custom format needs to be defined:

#set_message also allows or an optional second argument, which can be used to have multiple independent messages within the same format string:

When using ACON::Output::Sections, multiple progress bars can be displayed at the same time and updated independently:

Which would ultimately look something like:

Returns the global format string for the provided name if it exists, otherwise nil.

Returns the global formatter for the provided name if it exists, otherwise nil.

Registers the format globally with the provided name.

Registers a custom placeholder with the provided name with the block being the formatter.

Registers a custom placeholder with the provided name, using the provided callable as the formatter.

Advanced the progress bar by the provided number of steps.

Returns the character to use for the finished part of the bar.

Explicitly sets the character to use for the finished part of the bar.

Returns the amount of #bar_character representing the current #progress.

Returns the width of the progress bar in pixels.

Sets the width of the bar in pixels to the provided size. See #bar_width.

Clears the progress bar from the output. Can be used in conjunction with #display to allow outputting something while a progress bar is running. Call #clear, write the content, then call #display to show the progress bar again.

Requires that #overwrite= be set to true.

Displays the progress bar's current state.

Represents the character used for the unfinished part of the bar.

Represents the character used for the unfinished part of the bar.

Returns an estimated amount of time in seconds until the progress bar is completed.

Finishes the progress output, making it 100% complete.

Sets the format string used to determine how to display the progress bar. See Custom Formats for more information.

Sets what built in format to use. See Built-in Formats for more information.

Start, advance, and finish the progress bar automatically, yielding each item in the provided enumerable.

Which would output: 0/2 [>---------------------------] 0% 1/2 [==============>-------------] 50% 2/2 [============================] 100%

Iterator types are also supported, but need the max value provided explicitly via the second argument to #iterate if known.

Returns the maximum number of possible steps, or 0 if it is unknown.

Sets the maximum possible steps to the provided max.

Sets the maximum amount of time between redraws.

See Controlling Rendering for more information.

Returns the message associated with the provided name if defined, otherwise nil.

Sets the minimum amount of time between redraws.

See Controlling Rendering for more information.

Sets if the progress bar should overwrite the progress bar. Set to false in order to print the progress bar on a new line for each update.

Returns the amount of time in seconds until the progress bar is completed.

Returns the current step of the progress bar

Explicitly sets the current step number of the progress bar.

ameba:disable Metrics/CyclomaticComplexity

Represents the character used for the current progress of the bar.

Represents the character used for the current progress of the bar.

Returns the a percent of progress of #progress versus #max_steps. Returns zero if there is no max defined.

Redraw the progress bar every after advancing the provided amount of steps.

See Controlling Rendering for more information.

Returns an estimated total amount of time in seconds needed for the progress bar to complete.

Sets the message with the provided name to that of the provided message.

Same as .set_placeholder_formatter, but scoped to this particular progress bar.

Same as .set_placeholder_formatter, but scoped to this particular progress bar.

Starts the progress bar.

Optionally sets the maximum number of steps to max, or nil to leave unchanged. Optionally starts the progress bar at the provided step.

Returns the time the progress bar was started as a Unix epoch.

Returns the width in pixels that the current #progress takes up when displayed.

Returns the width in pixels that the current #progress takes up when displayed.

**Examples:**

Example 1 (julia):
```julia
# Create a new progress bar with 50 required units for completion.
progress_bar = ACON::Helper::ProgressBar.new output, 50

# Start and display the progress bar.
progress_bar.start

50.times do
  # Do work

  # Advance the progress bar by 1 unit.
  progress_bar.advance

  # Or advance by more than a single unit.
  # progress_bar.advance 3
end

# Ensure progress bar is at 100%.
progress_bar.finish
```

Example 2 (julia):
```julia
bar = ACON::Helper::ProgressBar.new output
arr = [1, 2, 3]

bar.iterate(arr) do |item|
  # Do something
end
```

Example 3 (javascript):
```javascript
0/2 [>---------------------------]   0%
1/2 [==============>-------------]  50%
2/2 [============================] 100%
```

Example 4 (markdown):
```markdown
# Create a 100 unit progress bar.
progress_bar = ACON::Helper::ProgressBar.new output, 100

# Display the progress bar starting at already 25% complete.
progress_bar.start at: 25
```

---

## module Athena::Serializer::Annotations #

**URL:** https://athenaframework.org/Serializer/Annotations/

**Contents:**
- module Athena::Serializer::Annotations #

Athena::Serializer uses annotations to control how an object gets serialized and deserialized. This module includes all the default serialization and deserialization annotations. The ASRA alias can be used as a shorthand when applying the annotations.

---

## API Reference

**URL:** https://athenaframework.org/api_reference/

**Contents:**
- API Reference

Links to the API docs of each component may be found in this section. These can be a good reference for more in-dept, component specific information, or how when using the component outside of the framework.

---

## class Athena::Negotiation::Negotiator inherits Athena::Negotiation::AbstractNegotiator #

**URL:** https://athenaframework.org/Negotiation/Negotiator/

**Contents:**
- class Athena::Negotiation::Negotiator inherits Athena::Negotiation::AbstractNegotiator #

A ANG::AbstractNegotiator implementation to negotiate ANG::Accept headers.

---

## class Athena::MIME::DraftEmail inherits Athena::MIME::Email #

**URL:** https://athenaframework.org/MIME/DraftEmail/

**Contents:**
- class Athena::MIME::DraftEmail inherits Athena::MIME::Email #
- Constructors#
  - .new(headers : AMIME::Header::Collection | Nil = nil, body : AMIME::Part::Abstract | Nil = nil)#
- Methods#
  - #prepared_headers : AMIME::Header::Collection#

Represent an un-sent AMIME::Email message.

Returns a cloned AMIME::Header::Collection consisting of a final representation of the headers associated with this message. I.e. Ensures the message's headers include the required ones.

**Examples:**

Example 1 (swift):
```swift
draft_email = AMIME::DraftEmail
  .new
  .to("[email protected]")
  .subject("Important Notification")
  .text("Lorem ipsum...")

# ...
```

---

## enum Athena::Console::Command::Status #

**URL:** https://athenaframework.org/Console/Command/Status/

**Contents:**
- enum Athena::Console::Command::Status #
- Members#
  - SUCCESS = 0#
  - FAILURE = 1#
  - INVALID = 2#
- Methods#
  - #failure?#
  - #invalid?#
  - #success?#

Represents the execution status of an ACON::Command.

The value of each member is used as the exit code of the invocation.

The exit code may be customized by manually instantiating the enum with it. E.g. Status.new 126.

Represents a successful invocation with no errors.

Represents that some error happened during invocation.

Represents the command was not used correctly, such as invalid options or missing arguments.

Returns true if this enum value equals FAILURE

Returns true if this enum value equals INVALID

Returns true if this enum value equals SUCCESS

---

## annotation Athena::EventDispatcher::Annotations::AsEventListener #

**URL:** https://athenaframework.org/EventDispatcher/Annotations/AsEventListener/

**Contents:**
- annotation Athena::EventDispatcher::Annotations::AsEventListener #

Can be applied to method(s) within a type to denote that method is an event listener. The annotation expects to be assigned to an instance method with between 1 and 2 parameters with a return type of Nil. The first parameter should be the concrete AED::Event instance the method is listening on. The optional second parameter should be typed as an AED::EventDispatcherInterface.

The annotation accepts an optional priority field, defaulting to 0, denoting the listener's priority

**Examples:**

Example 1 (php):
```php
class MyListener
  # Single parameter
  @[AEDA::AsEventListener]
  def single_param(event : MyEvent) : Nil
  end

  # Double parameter
  @[AEDA::AsEventListener]
  def double_param(event : MyEvent, dispatcher : AED::EventDispatcherInterface) : Nil
  end

  # With priority
  @[AEDA::AsEventListener(priority: 10)]
  def with_priority(event : MyEvent) : Nil
  end
end
```

---

## class Athena::Framework::View(T) inherits Reference #

**URL:** https://athenaframework.org/Framework/View/

**Contents:**
- class Athena::Framework::View(T) inherits Reference #
- Included modules
- Constructors#
  - .create_redirect(url : String, status : HTTP::Status = HTTP::Status::FOUND, headers : HTTP::Headers = HTTP::Headers.new) : self#
  - .create_route_redirect(route : String, params : Hash(String, _) = Hash(String, String | ::Nil).new, status : HTTP::Status = HTTP::Status::FOUND, headers : HTTP::Headers = HTTP::Headers.new) : self#
  - .new(data : T | Nil = nil, status : HTTP::Status | Nil = nil, headers : HTTP::Headers = HTTP::Headers.new)#
- Methods#
  - #context : ATH::View::Context#
  - #context=(context : ATH::View::Context)#
  - #data : T#

An ATH::View represents an ATH::Response, but in a format agnostic way.

Returning a ATH::View is essentially the same as returning the data directly; but allows customizing the response status and headers without needing to render the response body within the controller as an ATH::Response.

See the Getting Started docs for more information.

Creates a view instance that'll redirect to the provided url. See #location.

Optionally allows setting the underlying status and/or headers.

Creates a view instance that'll redirect to the provided route. See #route.

Optionally allows setting the underlying route params, status, and/or headers.

The format the view should be rendered in.

The format must be registered with the ATH::Request::FORMATS hash; either as a built in format, or a custom one that has registered via ATH::Request.register_format.

The format the view should be rendered in.

The format must be registered with the ATH::Request::FORMATS hash; either as a built in format, or a custom one that has registered via ATH::Request.register_format.

Returns the headers of the underlying #response.

Sets the headers that should be returned as part of the underlying #response.

Returns the URL that the current request should be redirected to.

See the Location header documentation.

Sets the redirect #location.

The wrapped ATH::Response instance.

The wrapped ATH::Response instance.

Returns the type of the data represented by self.

Returns the name of the route the current request should be redirected to.

See the Getting Started docs for more information.

Sets the redirect #route.

The parameters that should be used when constructing the redirect #route URL.

The parameters that should be used when constructing the redirect #route URL.

Adds the provided header name and value to the underlying #response.

Adds the provided header name and value to the underlying #response.

The HTTP::Status of the underlying #response.

The HTTP::Status of the underlying #response.

**Examples:**

Example 1 (json):
```json
require "athena"

class HelloController < ATH::Controller
  @[ARTA::Get("/{name}")]
  def say_hello(name : String) : NamedTuple(greeting: String)
    {greeting: "Hello #{name}"}
  end

  @[ARTA::Get("/view/{name}")]
  def say_hello_view(name : String) : ATH::View(NamedTuple(greeting: String))
    self.view({greeting: "Hello #{name}"}, :im_a_teapot)
  end
end

ATH.run

# GET /Fred      # => 200 {"greeting":"Hello Fred"}
# GET /view/Fred # => 418 {"greeting":"Hello Fred"}
```

---

## class Athena::Framework::BinaryFileResponse inherits Athena::Framework::Response #

**URL:** https://athenaframework.org/Framework/BinaryFileResponse/

**Contents:**
- class Athena::Framework::BinaryFileResponse inherits Athena::Framework::Response #
- Constructors#
  - .new(file : String | Path | ATH::AbstractFile | ::File, status : HTTP::Status | Int32 = HTTP::Status::OK, headers : HTTP::Headers | ATH::Response::Headers = ATH::Response::Headers.new, public : Bool = true, content_disposition : ATH::BinaryFileResponse::ContentDisposition | Nil = nil, auto_etag : Bool = false, auto_last_modified : Bool = true)#
- Methods#
  - #auto_last_modified : self#
  - #content : String#
  - #content=(data) : self#
  - #delete_file_after_send=(delete_file_after_send : Bool)#
  - #file : ATH::AbstractFile#
  - #set_auto_etag : self#

Represents a static file that should be returned the client; includes various options to enhance the response headers. See .new for details.

This response supports Range requests and Conditional requests via the If-None-Match, If-Modified-Since, and If-Range headers.

See ATH::HeaderUtils.make_disposition for an example of handling dynamic files.

Instantiates self wrapping the provided file, optionally with the provided status, and headers.

By default the response is ATH::Response#set_public and includes a last-modified header, but these can be controlled via the public and auto_last_modified arguments respectively.

The content_disposition argument can be used to set the content-disposition header on self if it should be downloadable.

The auto_etag argument can be used to automatically set ETag header based on a SHA256 hash of the file.

Sets the last-modified header on self based on the modification time of the file.

Cannot get the response content via this method on self.

Cannot set the response content via this method on self.

Determines if the file should be deleted after being sent to the client.

Returns a ATH::AbstractFile instance representing the file that will be sent to the client.

Sets the etag header on self based on a SHA256 hash of the file.

Sets the content-disposition header on self to the provided disposition. filename defaults to the basename of #file_path.

See ATH::HeaderUtils.make_disposition.

Sets the file that will be streamed to the client. Includes the same optional parameters as .new.

---

## class Athena::MIME::Header::Identification inherits Athena::MIME::Header::Abstract #

**URL:** https://athenaframework.org/MIME/Header/Identification/

**Contents:**
- class Athena::MIME::Header::Identification inherits Athena::MIME::Header::Abstract #
- Constructors#
  - .new(name : String, value : String | Array(String))#
- Methods#
  - #body : Array(String)#
  - #body=(body : String | Array(String))#
  - #id : String | ::Nil#
  - #id=(id : String | Array(String)) : Nil#
  - #ids : Array(String)#
  - #ids=(ids : Array(String)) : Nil#

Represents an ID MIME Header for something like message-id or content-id (one or more addresses).

Returns the body of this header.

Returns the ID used in the value of this header. If multiple IDs are set, only the first is returned.

Sets the ID used in the value of this header.

Sets a collection of IDs to use in the value of this header.

---

## annotation Athena::DependencyInjection::TaggedIterator #

**URL:** https://athenaframework.org/DependencyInjection/TaggedIterator/

**Contents:**
- annotation Athena::DependencyInjection::TaggedIterator #
    - Example#

Can be applied to a collection parameter to provide all the services with a specific tag. Supported collection types include: Indexable, Enumerable, and Iterator. Accepts an optional tag name as the first positional parameter, otherwise defaults to the FQN of the type within the collection type's generic.

This type is best used in conjunction with ADI::AutoconfigureTag.

The provided type lazily initializes the provided services as they are accessed.

**Examples:**

Example 1 (python):
```python
@[ADI::Register]
class Foo
  # Inject all services tagged with `"some-tag"`.
  def initialize(@[ADI::TaggedIterator("some-tag")] @services : Enumerable(SomeInterface)); end
end

@[ADI::Register]
class Bar
  # Inject all services tagged with `"SomeInterface"`.
  def initialize(@[ADI::TaggedIterator] @services : Enumerable(SomeInterface)); end
end
```

---

## class Athena::Validator::Constraints::Luhn inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/Luhn/

**Contents:**
- class Athena::Validator::Constraints::Luhn inherits Athena::Validator::Constraint #
- Configuration#
  - Optional Arguments#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Constants#
  - CHECKSUM_FAILED_ERROR = "a4f089dd-fd63-4d50-ac30-34ed2a8dc9dd"#
  - INVALID_CHARACTERS_ERROR = "c42b8d36-d9e9-4f5f-aad6-5190e27a1102"#

Validates that a credit card number passes the Luhn algorithm; a useful first step to validating a credit card. The underlying value is converted to a string via #to_s before being validated.

As with most other constraints, nil and empty strings are considered valid values, in order to allow the value to be optional. If the value is required, consider combining this constraint with AVD::Constraints::NotBlank.

Type: String Default: This value is not a valid credit card number.

The message that will be shown if the value is not pass the Luhn check.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class Transaction
  include AVD::Validatable

  def initialize(@card_number : String); end

  @[Assert::Luhn]
  property card_number : String
end
```

---

## enum Athena::Console::Helper::ProgressBar::Format #

**URL:** https://athenaframework.org/Console/Helper/ProgressBar/Format/

**Contents:**
- enum Athena::Console::Helper::ProgressBar::Format #
- Members#
  - DEBUG = 0#
  - VERY_VERBOSE = 1#
  - VERBOSE = 2#
  - NORMAL = 3#
  - DEBUG_NOMAX = 4#
  - VERBOSE_NOMAX = 5#
  - VERY_VERBOSE_NOMAX = 6#
  - NORMAL_NOMAX = 7#

Represents the built in progress bar formats.

See Built-In Formats for more information.

" %current%/%max% [%bar%] %percent:3s%% %elapsed:6s%/%estimated:-6s% %memory:6s%"

" %current%/%max% [%bar%] %percent:3s%% %elapsed:6s%/%estimated:-6s%"

" %current%/%max% [%bar%] %percent:3s%% %elapsed:6s%"

" %current%/%max% [%bar%] %percent:3s%%"

" %current% [%bar%] %elapsed:6s% %memory:6s%"

" %current% [%bar%] %elapsed:6s%"

" %current% [%bar%] %elapsed:6s%"

Returns true if this enum value equals DEBUG

Returns true if this enum value equals DEBUG_NOMAX

Returns true if this enum value equals NORMAL

Returns true if this enum value equals NORMAL_NOMAX

Returns true if this enum value equals VERBOSE

Returns true if this enum value equals VERBOSE_NOMAX

Returns true if this enum value equals VERY_VERBOSE

Returns true if this enum value equals VERY_VERBOSE_NOMAX

---

## class Athena::Framework::RequestStore inherits Reference #

**URL:** https://athenaframework.org/Framework/RequestStore/

**Contents:**
- class Athena::Framework::RequestStore inherits Reference #
- Methods#
  - #request : ATH::Request#
  - #request=(request : ATH::Request)#
  - #request? : ATH::Request | ::Nil#

Stores the current ATH::Request object.

Can be injected to access the request from a non controller context.

**Examples:**

Example 1 (python):
```python
require "athena"

@[ADI::Register(public: true)]
class ExampleController < ATH::Controller
  def initialize(@request_store : ATH::RequestStore); end

  get "/" do
    @request_store.method
  end
end

ATH.run

# GET / # => GET
```

---

## abstract class Athena::Framework::Controller inherits Reference #

**URL:** https://athenaframework.org/Framework/Controller/

**Contents:**
- abstract class Athena::Framework::Controller inherits Reference #
    - Example#
- Methods#
  - #generate_url(route : String, params : Hash(String, _) = Hash(String, String | ::Nil).new, reference_type : ART::Generator::ReferenceType = :absolute_path) : String#
  - #generate_url(route : String, reference_type : ART::Generator::ReferenceType = :absolute_path, **params)#
  - #redirect(url : String | Path, status : HTTP::Status = HTTP::Status::FOUND) : ATH::RedirectResponse#
  - #redirect_to_route(route : String, params : Hash(String, _) = Hash(String, String | ::Nil).new, status : HTTP::Status = :found) : ATH::RedirectResponse#
  - #redirect_to_route(route : String, status : HTTP::Status = :found, **params) : ATH::RedirectResponse#
  - #redirect_view(url : String, status : HTTP::Status = HTTP::Status::FOUND, headers : HTTP::Headers = HTTP::Headers.new) : ATH::View#
  - #route_redirect_view(route : String, params : Hash(String, _) = Hash(String, String | ::Nil).new, status : HTTP::Status = HTTP::Status::CREATED, headers : HTTP::Headers = HTTP::Headers.new) : ATH::View#

The core of any framework is routing; how a route is tied to an action. Athena takes an annotation based approach; an annotation, such as ARTA::Get is applied to an instance method of a controller class, which will be executed when that endpoint receives a request.

Additional annotations also exist for defining query parameters.

Child controllers must inherit from ATH::Controller (or an abstract child of it). Each request gets its own instance of the controller to better allow for DI via Athena::DependencyInjection.

A route action can either return an ATH::Response, or some other type. If an ATH::Response is returned, then it is used directly. Otherwise an ATH::Events::View is emitted to convert the action result into an ATH::Response. By default, ATH::Listeners::View will JSON encode the value if it is not handled earlier by another listener.

The following controller shows examples of the various routing features of Athena. ATH::Controller also defines various macro DSLs, such as ATH::Controller.get to make defining routes seem more Sinatra/Kemal like. See the documentation on the macros for more details.

Generates a URL to the provided route with the provided params.

See ART::Generator::Interface#generate.

Generates a URL to the provided route with the provided params.

See ART::Generator::Interface#generate.

Returns an ATH::RedirectResponse to the provided url, optionally with the provided status.

Returns an ATH::RedirectResponse to the provided route with the provided params.

Returns an ATH::RedirectResponse to the provided route with the provided params.

Returns an ATH::View that'll redirect to the provided url, optionally with the provided status and headers.

Is essentially the same as #redirect, but invokes the view layer.

Returns an ATH::View that'll redirect to the provided route, optionally with the provided params, status, and headers.

Is essentially the same as #redirect_to_route, but invokes the view layer.

Returns an ATH::View with the provided data, and optionally status and headers.

Helper DSL macro for creating DELETE actions.

The first argument is the path that the action should handle; which maps to path on the HTTP method annotation. The second argument is a variable amount of arguments with a syntax similar to Crystal's record. There are also a few optional named arguments that map to the corresponding field on the HTTP method annotation.

The macro simply defines a method based on the options passed to it. Additional annotations, such as for query params or a param converter can simply be added on top of the macro.

Helper DSL macro for creating GET actions.

The first argument is the path that the action should handle; which maps to path on the HTTP method annotation. The second argument is a variable amount of arguments with a syntax similar to Crystal's record. There are also a few optional named arguments that map to the corresponding field on the HTTP method annotation.

The macro simply defines a method based on the options passed to it. Additional annotations, such as for query params or a param converter can simply be added on top of the macro.

Helper DSL macro for creating HEAD actions.

The first argument is the path that the action should handle; which maps to path on the HTTP method annotation. The second argument is a variable amount of arguments with a syntax similar to Crystal's record. There are also a few optional named arguments that map to the corresponding field on the HTTP method annotation.

The macro simply defines a method based on the options passed to it. Additional annotations, such as for query params or a param converter can simply be added on top of the macro.

Helper DSL macro for creating LINK actions.

The first argument is the path that the action should handle; which maps to path on the HTTP method annotation. The second argument is a variable amount of arguments with a syntax similar to Crystal's record. There are also a few optional named arguments that map to the corresponding field on the HTTP method annotation.

The macro simply defines a method based on the options passed to it. Additional annotations, such as for query params or a param converter can simply be added on top of the macro.

Helper DSL macro for creating PATCH actions.

The first argument is the path that the action should handle; which maps to path on the HTTP method annotation. The second argument is a variable amount of arguments with a syntax similar to Crystal's record. There are also a few optional named arguments that map to the corresponding field on the HTTP method annotation.

The macro simply defines a method based on the options passed to it. Additional annotations, such as for query params or a param converter can simply be added on top of the macro.

Helper DSL macro for creating POST actions.

The first argument is the path that the action should handle; which maps to path on the HTTP method annotation. The second argument is a variable amount of arguments with a syntax similar to Crystal's record. There are also a few optional named arguments that map to the corresponding field on the HTTP method annotation.

The macro simply defines a method based on the options passed to it. Additional annotations, such as for query params or a param converter can simply be added on top of the macro.

Helper DSL macro for creating PUT actions.

The first argument is the path that the action should handle; which maps to path on the HTTP method annotation. The second argument is a variable amount of arguments with a syntax similar to Crystal's record. There are also a few optional named arguments that map to the corresponding field on the HTTP method annotation.

The macro simply defines a method based on the options passed to it. Additional annotations, such as for query params or a param converter can simply be added on top of the macro.

Uses ECR to render the template, creating an ATH::Response with its rendered content and adding a text/html content-type header.

The response can be modified further before returning it if needed.

Variables used within the template must be defined within the action's body manually if they are not provided within the action's arguments.

Renders a template within a layout. # layout.ecr <h1>Content:</h1> <%= content -%> # greeting.ecr Greetings, <%= name %>! # example_controller.cr class ExampleController < ATH::Controller @[ARTA::Get("/{name}")] def greet(name : String) : ATH::Response render "greeting.ecr", "layout.ecr" end end ATH.run # GET /Fred # => <h1>Content:</h1> Greetings, Fred!

Helper DSL macro for creating UNLINK actions.

The first argument is the path that the action should handle; which maps to path on the HTTP method annotation. The second argument is a variable amount of arguments with a syntax similar to Crystal's record. There are also a few optional named arguments that map to the corresponding field on the HTTP method annotation.

The macro simply defines a method based on the options passed to it. Additional annotations, such as for query params or a param converter can simply be added on top of the macro.

**Examples:**

Example 1 (typescript):
```typescript
require "athena"
require "mime"

# The `ARTA::Route` annotation can also be applied to a controller class.
# This can be useful for applying a common path prefix, defaults, requirements,
# etc. to all actions in the controller.
@[ARTA::Route(path: "/athena")]
class TestController < ATH::Controller
  # A GET endpoint returning an `ATH::Response`.
  # Can be used to return raw data, such as HTML or CSS etc, in a one-off manor.
  @[ARTA::Get(path: "/index")]
  def index : ATH::Response
    ATH::Response.new "<h1>Welcome to my website!</h1>", headers: HTTP::Headers{"content-type" => MIME.from_extension(".html")}
  end

  # A GET endpoint returning an `ATH::StreamedResponse`.
  # Can be used to stream the response content to the client;
  # useful if the content is too large to fit into memory.
  @[ARTA::Get(path: "/users")]
  def users : ATH::Response
    ATH::StreamedResponse.new headers: HTTP::Headers{"content-type" => "application/json; charset=utf-8"} do |io|
      User.all.to_json io
    end
  end

  # A GET endpoint with no parameters returning a `String`.
  #
  # Action return type restrictions are required.
  @[ARTA::Get("/me")]
  def get_me : String
    "Jim"
  end

  # A GET endpoint with no parameters returning `Nil`.
  # `Nil` return types are returned with a status
  # of 204 no content
  @[ARTA::Get("/no_content")]
  def get_no_content : Nil
    # Do stuff
  end

  # A GET endpoint with two `Int32` parameters returning an `Int32`.
  #
  # The parameters of a route _MUST_ match the parameters of the action.
  # Type restrictions on action parameters are required.
  @[ARTA::Get("/add/{val1}/{val2}")]
  def add(val1 : Int32, val2 : Int32) : Int32
    val1 + val2
  end

  # A GET endpoint with a required trailing slash, a `String` route parameter,
  # and a required string query parameter; returning a `String`.
  #
  # Athena treats non `GET`/`HEAD` routes with a trailing slash as unique
  # E.g. `POST /foo/bar/` versus `POST /foo/bar`.
  # Be sure to keep you routes consistent!
  #
  # A non-nilable type denotes it as required. If the parameter is not supplied,
  # and no default value is assigned, an `ATH::Exception::BadRequest` exception is raised.
  @[ARTA::Get("/event/{event_name}/")]
  def event_time(event_name : String, @[ATHA::MapQueryParameter] time : String) : String
    "#{event_name} occurred at #{time}"
  end

  # A GET endpoint with an optional query parameter and optional path parameter
  # with a default value; returning a `NamedTuple(user_id : Int32?, page : Int32)`.
  #
  # A nilable type denotes it as optional.
  # If the parameter is not supplied (or could not be converted),
  # and no default value is assigned, it is `nil`.
  @[ARTA::Get("/events/{page}")]
  def events(@[ATHA::MapQueryParameter] user_id : Int32?, page : Int32 = 1) : NamedTuple(user_id: Int32?, page: Int32)
    {user_id: user_id, page: page}
  end

  # A GET endpoint with route parameter requirements.
  # The parameter must match the supplied Regex or this route will not be matched.
  #
  # This feature can allow multiple routes to exist with parameters in the same location,
  # but with different requirements.
  @[ARTA::Get("/time/{time}/", requirements: {"time" => /\d{2}:\d{2}:\d{2}/})]
  def get_constraint(time : String) : String
    time
  end

  # A POST endpoint with a route parameter and accessing the request body; returning a `Bool`.
  #
  # It is recommended to use `ATHR::RequestBody` to allow passing an actual object representing the data
  # to the route's action; however the raw request body can be accessed by typing an action argument as `ATH::Request`.
  @[ARTA::Post("/test/{expected}")]
  def post_body(expected : String, request : ATH::Request) : Bool
    expected == request.body.try &.gets_to_end
  end

  # An endpoint may also have more than one route annotation applied to it.
  # This can be useful in allowing for a route to support multiple aliases.
  @[ARTA::Get("/users/{id}")]
  @[ARTA::Get("/people/{id}")]
  def get_user(id : Int64) : User
    # Fetch the user
    user = ...

    user
  end
end

ATH.run

# GET /athena/index                    # => <h1>Welcome to my website!</h1>
# GET /athena/users                    # => [{"id":1,...},...]
# GET /athena/wakeup/17                # => Morning, Allison it is currently 2020-02-01 18:38:12 UTC.
# GET /athena/me                       # => "Jim"
# GET /athena/add/50/25                # => 75
# GET /athena/event/foobar?time=1:1:1  # => "foobar occurred at 1:1:1"
# GET /athena/event/foobar/?time=1:1:1 # => "foobar occurred at 1:1:1"
# GET /athena/events                   # => {"user_id":null,"page":1}
# GET /athena/events/17?user_id=19     # => {"user_id":19,"page":17}
# GET /athena/time/12:45:30            # => "12:45:30"
# GET /athena/time/12:aa:30            # => 404 not found
# GET /athena/no_content               # => 204 no content
# GET /athena/users/19                 # => {"user_id":19}
# GET /athena/people/19                # => {"user_id":19}
# POST /athena/test/foo, body: "foo"   # => true
```

Example 2 (swift):
```swift
class ExampleController < ATH::Controller
  @[ARTA::Get("redirect/google")]
  def redirect_to_google : ATH::RedirectResponse
    self.redirect "https://google.com"
  end
end
```

Example 3 (swift):
```swift
require "athena"

class ExampleController < ATH::Controller
  # Define a route to redirect to, explicitly naming this route `add`.
  # The default route name is controller + method down snake-cased; e.x. `example_controller_add`.
  @[ARTA::Get("/add/{value1}/{value2}", name: "add")]
  def add(value1 : Int32, value2 : Int32, negative : Bool = false) : Int32
    sum = value1 + value2
    negative ? -sum : sum
  end

  # Define a route that redirects to the `add` route with fixed parameters.
  @[ARTA::Get("/")]
  def redirect : ATH::RedirectResponse
    self.redirect_to_route "add", {"value1" => 8, "value2" => 2}
  end
end

ATH.run

# GET / # => 10
```

Example 4 (swift):
```swift
require "athena"

class ExampleController < ATH::Controller
  # Define a route to redirect to, explicitly naming this route `add`.
  # The default route name is controller + method down snake-cased; e.x. `example_controller_add`.
  @[ARTA::Get("/add/{value1}/{value2}", name: "add")]
  def add(value1 : Int32, value2 : Int32, negative : Bool = false) : Int32
    sum = value1 + value2
    negative ? -sum : sum
  end

  # Define a route that redirects to the `add` route with fixed parameters.
  @[ARTA::Get("/")]
  def redirect : ATH::RedirectResponse
    self.redirect_to_route "add", value1: 8, value2: 2
  end
end

ATH.run

# GET / # => 10
```

---

## annotation Athena::Framework::Annotations::MapUploadedFile #

**URL:** https://athenaframework.org/Framework/Annotations/MapUploadedFile/

**Contents:**
- annotation Athena::Framework::Annotations::MapUploadedFile #
- Configuration#
  - Optional Arguments#
    - name#
    - constraints#

Enables the ATHR::RequestBody resolver for the parameter this annotation is applied to based on ATH::Request#files, if the related bundle configuration is enabled.

If the type of the parameter this annotation is applied to is ATH::UploadedFile, then it will attempt to resolve the first file based on the name of the parameter. This can be customized via the name field on the annotation. If the type is a Array(ATH::UploadedFile) then all files with that name will be resolved, not just the first.

When resolving a single file that is not found, and the parameter has a default value or is nilable, then that default value, or nil, will be used. If the parameter does not have a default and is not nilable, then an error response is returned. When resolving an array of files, then an empty array would be provided.

Type: String? Default: nil

Use this value to resole the files instead of the name of the parameter the annotation is applied to.

Type: AVD::Constraint | Array(AVD::Constraint) | Nil Default: nil

Validate the uploaded file(s) against these constraint(s). Mostly commonly will be a single AVD::Constraints::File or AVD::Constraints::Image constraint.

**Examples:**

Example 1 (php):
```php
class UserController < ATH::Controller
  @[ARTA::Post("/avatar")]
  def avatar(
    @[ATHA::MapUploadedFile(constraints: AVD::Constraints::Image.new)]
    profile_picture : ATH::UploadedFile,
  ) : Nil
    # ...
  end
end
```

---

## module Athena::Clock::Interface #

**URL:** https://athenaframework.org/Clock/Interface/

**Contents:**
- module Athena::Clock::Interface #
- Direct including types
- Methods#
  - abstract #in_location(location : Time::Location) : self#
  - abstract #now : Time#
  - abstract #sleep(span : Time::Span) : Nil#

Represents a clock that returns a Time instance, possibly in a specific location.

Returns a new clock instance set to the provided location.

Returns the current time as determined by the clock.

Sleeps for the provided span of time.

---

## annotation Athena::DependencyInjection::Register #

**URL:** https://athenaframework.org/DependencyInjection/Register/

**Contents:**
- annotation Athena::DependencyInjection::Register #
  - Optional Arguments#
  - Examples#
    - Basic Usage#
    - Aliasing Services#
    - Scalar Arguments#
    - Tagging Services#
    - Service Calls#
    - Service Proxies#
      - Tagged Services Proxies#

Automatically registers a service based on the type the annotation is applied to.

The type of the service affects how it behaves within the container. When a struct service is retrieved or injected into a type, it will be a copy of the one in the SC (passed by value). This means that changes made to it in one type, will NOT be reflected in other types. A class service on the other hand will be a reference to the one in the SC. This allows it to share state between services.

In most cases, the annotation can be applied without additional arguments. However, the annotation accepts a handful of optional arguments to fine tune how the service is registered.

The simplest usage involves only applying the ADI::Register annotation to a type. If the type does not have any arguments, then it is simply registered as a service as is. If the type does have arguments, then an attempt is made to register the service by automatically resolving dependencies based on type restrictions.

An important part of DI is building against interfaces as opposed to concrete types. This allows a type to depend upon abstractions rather than a specific implementation of the interface. Or in other words, prevents a singular implementation from being tightly coupled with another type.

The ADI::AsAlias annotation can be used to define a default implementation for an interface. Checkout the annotation's docs for more information.

The auto registration logic as shown in previous examples only works on service dependencies. Scalar arguments, such as Arrays, Strings, NamedTuples, etc, must be defined manually. This is achieved by using the argument's name prefixed with a _ symbol as named arguments within the annotation.

@[ADI::Register(_shell: ENV["SHELL"], _config: {id: 12_i64, active: true}, public: true)] struct ScalarClient def initialize(@shell : String, @config : NamedTuple(id: Int64, active: Bool)); end end ADI.container.scalar_client # => ScalarClient(@config={id: 12, active: true}, @shell="/bin/bash") Arrays can also include references to services by prefixing the name of the service with an @ symbol.

While scalar arguments cannot be auto registered by default, the Athena::DependencyInjection.bind macro can be used to support it. For example: ADI.bind shell, "bash". This would now inject the string "bash" whenever an argument named shell is encountered.

Services can also be tagged. Service tags allows another service to have all services with a specific tag injected as a dependency. A tag consists of a name, and additional metadata related to the tag.

Checkout ADI::AutoconfigureTag for an easy way to tag services.

The ADI::TaggedIterator annotation provides an easy way to inject services with a specific tag to a specific parameter.

Service calls can be defined that will call a specific method on the service, with a set of arguments. Use cases for this are generally not all that common, but can sometimes be useful.

In some cases, it may be a bit "heavy" to instantiate a service that may only be used occasionally. To solve this, a proxy of the service could be injected instead. The instantiation of proxied services are deferred until a method is called on it.

A service is proxied by changing the type signature of the service to be of the ADI::Proxy(T) type, where T is the service to be proxied.

Tagged services may also be injected as an array of proxy objects. This can be useful as an easy way to manage a collection of services where only one (or a small amount) will be used at a time.

The ADI::Proxy object also exposes some metadata related to the proxied object; such as its name, type, and if it has been instantiated yet.

For example, using ServiceTwo:

Reusable configuration parameters can be injected directly into services using the same syntax as when used within ADI.configure. Parameters may be supplied either via Athena::DependencyInjection.bind or an explicit service argument.

Services defined with a nillable type restriction are considered to be optional. If no service could be resolved from the type, then nil is injected instead. Similarly, if the argument has a default value, that value would be used instead.

Generic arguments can be provided as positional arguments within the ADI::Register annotation.

Services based on generic types MUST explicitly provide a name via the name field within the ADI::Register annotation since there wouldn't be a way to tell them apart from the class name alone.

In some cases it may be necessary to use the factory design pattern to handle creating an object as opposed to creating the object directly. In this case the factory argument can be used.

Factory methods are class methods defined on some type; either the service itself or a different type. Arguments to the factory method are provided as they would if the service was being created directly. This includes auto resolved service dependencies, and scalar underscore based arguments included within the ADI::Register annotation.

A String factory value denotes the method name that should be called on the service itself to create the service.

Using the ADI::Inject annotation on a class method is equivalent to providing that method's name as the factory value. For example, this is the same as the previous example:

A Tuple can also be provided as the factory value to allow using an external type's factory method to create the service. The first item represents the factory type to use, and the second item represents the method that should be called.

**Examples:**

Example 1 (julia):
```julia
@[ADI::Register]
# Register a service without any dependencies.
struct ShoutTransformer
  def transform(value : String) : String
    value.upcase
  end
end

@[ADI::Register(public: true)]
# The ShoutTransformer is injected based on the type restriction of the `transformer` argument.
struct SomeAPIClient
  def initialize(@transformer : ShoutTransformer); end

  def send(message : String)
    message = @transformer.transform message

    # ...
  end
end

ADI.container.some_api_client.send "foo" # => FOO
```

Example 2 (julia):
```julia
@[ADI::Register(_shell: ENV["SHELL"], _config: {id: 12_i64, active: true}, public: true)]
struct ScalarClient
  def initialize(@shell : String, @config : NamedTuple(id: Int64, active: Bool)); end
end

ADI.container.scalar_client # => ScalarClient(@config={id: 12, active: true}, @shell="/bin/bash")
```

Example 3 (julia):
```julia
module Interface; end

@[ADI::Register]
struct One
  include Interface
end

@[ADI::Register]
struct Two
  include Interface
end

@[ADI::Register]
struct Three
  include Interface
end

@[ADI::Register(_services: ["@one", "@three"], public: true)]
struct ArrayClient
  def initialize(@services : Array(Interface)); end
end

ADI.container.array_client # => ArrayClient(@services=[One(), Three()])
```

Example 4 (python):
```python
PARTNER_TAG = "partner"

@[ADI::Register(_id: 1, name: "google", tags: [{name: PARTNER_TAG, priority: 5}])]
@[ADI::Register(_id: 2, name: "facebook", tags: [PARTNER_TAG])]
@[ADI::Register(_id: 3, name: "yahoo", tags: [{name: "partner", priority: 10}])]
@[ADI::Register(_id: 4, name: "microsoft", tags: [PARTNER_TAG])]
# Register multiple services based on the same type.  Each service must give define a unique name.
record FeedPartner, id : Int32

@[ADI::Register(public: true)]
class PartnerClient
  getter services : Enumerable(FeedPartner)

  def initialize(@[ADI::TaggedIterator(PARTNER_TAG)] @services : Enumerable(FeedPartner)); end
end

ADI.container.partner_client.services.to_a # =>
# [FeedPartner(@id=3),
#  FeedPartner(@id=1),
#  FeedPartner(@id=2),
#  FeedPartner(@id=4)]
```

---

## module Athena::Console::Helper::Interface #

**URL:** https://athenaframework.org/Console/Helper/Interface/

**Contents:**
- module Athena::Console::Helper::Interface #
- Direct including types
- Methods#
  - abstract #helper_set : ACON::Helper::HelperSet | ::Nil#
  - abstract #helper_set=(helper_set : ACON::Helper::HelperSet | Nil)#

Returns the ACON::Helper::HelperSet related to self, if any.

Sets the ACON::Helper::HelperSet related to self.

---

## class Athena::Console::Question::Confirmation inherits Athena::Console::Question #

**URL:** https://athenaframework.org/Console/Question/Confirmation/

**Contents:**
- class Athena::Console::Question::Confirmation inherits Athena::Console::Question #
- Constructors#
  - .new(question : String, default : Bool = true, true_answer_regex : Regex = /^y/i)#

Allows prompting the user to confirm an action.

In this example the user will be asked if they wish to Continue with this action. The #ask method will return true if the user enters anything starting with y, otherwise false.

Creates a new instance of self with the provided question string. The default parameter represents the value to return if no valid input was entered. The true_answer_regex can be used to customize the pattern used to determine if the user's input evaluates to true.

**Examples:**

Example 1 (swift):
```swift
question = ACON::Question::Confirmation.new "Continue with this action?", false
helper = self.helper ACON::Helper::Question

if !helper.ask input, output, question
  return ACON::Command::Status::SUCCESS
end

# ...
```

---

## struct Athena::Framework::RequestMatcher::QueryParameter inherits Struct #

**URL:** https://athenaframework.org/Framework/RequestMatcher/QueryParameter/

**Contents:**
- struct Athena::Framework::RequestMatcher::QueryParameter inherits Struct #
- Included modules
- Constructors#
  - .new(parameters : Array(String))#
  - .new(*parameters : String)#
- Methods#
  - #matches?(request : ATH::Request) : Bool#

Checks the presence of HTTP query parameters in an ATH::Request.

Decides whether the rule(s) implemented by the strategy matches the provided request.

---

## struct Athena::Framework::Response::DirectWriter inherits Athena::Framework::Response::Writer #

**URL:** https://athenaframework.org/Framework/Response/DirectWriter/

**Contents:**
- struct Athena::Framework::Response::DirectWriter inherits Athena::Framework::Response::Writer #
- Methods#
  - #write(output : IO, & : IO -> Nil) : Nil#

The default ATH::Response::Writer for an ATH::Response.

Writes directly to the output IO.

Accepts an output IO that the content of the response should be written to.

The output IO is yielded directly.

---

## module Athena::Clock::Spec #

**URL:** https://athenaframework.org/Clock/Spec/

**Contents:**
- module Athena::Clock::Spec #
    - Getting Started#

A set of testing utilities/types to aid in testing Athena::Clock related types.

Require this module in your spec_helper.cr file:

**Examples:**

Example 1 (unknown):
```unknown
require "athena-clock/spec"
```

---

## annotation Athena::Serializer::Annotations::Accessor #

**URL:** https://athenaframework.org/Serializer/Annotations/Accessor/

**Contents:**
- annotation Athena::Serializer::Annotations::Accessor #
  - Fields#
  - Example#
    - Getter/Setter#
    - Converter#
    - Path#

Allows using methods/modules to control how a property is retrieved/set.

**Examples:**

Example 1 (python):
```python
class AccessorExample
  include ASR::Serializable

  def initialize; end

  @[ASRA::Accessor(getter: get_foo, setter: set_foo)]
  property foo : String = "foo"

  private def set_foo(foo : String) : String
    @foo = foo.upcase
  end

  private def get_foo : String
    @foo.upcase
  end
end

ASR.serializer.serialize AccessorExample.new, :json                 # => {"foo":"FOO"}
ASR.serializer.deserialize AccessorExample, %({"foo":"bar"}), :json # => #<AccessorExample:0x7f5915e25c20 @foo="BAR">
```

Example 2 (julia):
```julia
module ReverseConverter
  def self.deserialize(navigator : ASR::Navigators::DeserializationNavigatorInterface, metadata : ASR::PropertyMetadataBase, data : ASR::Any) : String
    data.as_s.reverse
  end
end

class ConverterExample
  include ASR::Serializable

  @[ASRA::Accessor(converter: ReverseConverter)]
  getter str : String
end

ASR.serializer.deserialize ConverterExample, %({"str":"jim"}), :json # => #<ConverterExample:0x7f9745fa6d60 @str="mij">
```

Example 3 (json):
```json
class Example
  include ASR::Serializable

  getter id : Int64

  @[ASRA::Accessor(path: {"stats", "HP"})]
  getter hp : Int32

  @[ASRA::Accessor(path: {"stats", "Attack"})]
  getter attack : Int32

  @[ASRA::Accessor(path: {"downs", -1, "last_down"})]
  getter last_down : Time
end

DATA = <<-JSON
{
  "id": 1,
  "stats": {
    "HP": 45,
    "Attack": 49
  },
  "downs": [
    {
      "id": 1,
      "last_down": "2020-05-019T05:23:17Z"
    },
    {
      "id": 2,
      "last_down": "2020-04-07T12:34:56Z"
    }
  ]

}
JSON

ASR.serializer.deserialize Example, DATA, :json
# #<Example:0x7f43c4ddf580
#  @attack=49,
#  @hp=45,
#  @id=1,
#  @last_down=2020-04-07 12:34:56.0 UTC>
```

---

## class Athena::Dotenv::Exception::Format inherits Athena::Dotenv::Exception::Logic #

**URL:** https://athenaframework.org/Dotenv/Exception/Format/

**Contents:**
- class Athena::Dotenv::Exception::Format inherits Athena::Dotenv::Exception::Logic #
- Constructors#
  - .new(message : String, context : Athena::Dotenv::Exception::Format::Context, cause : ::Exception | Nil = nil)#
- Methods#
  - #context : Athena::Dotenv::Exception::Format::Context#

Raised when there is a parsing error within a .env file.

Returns an object containing contextual information about this error.

---

## class Athena::EventDispatcher::Spec::TracableEventDispatcher inherits Athena::EventDispatcher::EventDispatcher #

**URL:** https://athenaframework.org/EventDispatcher/Spec/TracableEventDispatcher/

**Contents:**
- class Athena::EventDispatcher::Spec::TracableEventDispatcher inherits Athena::EventDispatcher::EventDispatcher #
- Methods#
  - #dispatch(event : AED::Event) : Nil#
  - #emitted_events : Array(AED::Event.class)#

Test implementation of AED::EventDispatcherInterface that keeps track of the events that were dispatched.

Returns an array of each AED::Event.class that was dispatched via this dispatcher.

**Examples:**

Example 1 (php):
```php
class MyEvent < AED::Event; end

class OtherEvent < AED::Event; end

dispatcher = AED::Spec::TracableEventDispatcher.new

dispatcher.dispatch MyEvent.new
dispatcher.dispatch OtherEvent.new

dispatcher.emitted_events # => [MyEvent, OtherEvent]
```

---

## class Athena::Serializer::SerializationContext inherits Athena::Serializer::Context #

**URL:** https://athenaframework.org/Serializer/SerializationContext/

**Contents:**
- class Athena::Serializer::SerializationContext inherits Athena::Serializer::Context #
- Methods#
  - #direction : ASR::Context::Direction#
  - #emit_nil=(emit_nil : Bool)#
  - #emit_nil? : Bool#

The ASR::Context specific to serialization.

Allows specifying if nil values should be serialized.

Returns which (de)serialization action self represents.

If nil values should be serialized.

If nil values should be serialized.

---

## struct Athena::Framework::Controller::ValueResolvers::DefaultValue inherits Struct #

**URL:** https://athenaframework.org/Framework/Controller/ValueResolvers/DefaultValue/

**Contents:**
- struct Athena::Framework::Controller::ValueResolvers::DefaultValue inherits Struct #
- Included modules
- Constructors#
  - .new#
- Methods#
  - #initialize#
  - #resolve(request : ATH::Request, parameter : ATH::Controller::ParameterMetadata)#

Resolves the default value of a controller action parameter if no other value was provided; using nil if the parameter does not have a default value, but is nilable.

Returns a value resolved from the provided request and parameter if possible, otherwise returns nil if no parameter could be resolved.

**Examples:**

Example 1 (typescript):
```typescript
require "athena"

class ExampleController < ATH::Controller
  @[ARTA::Get("/default")]
  def default(id : Int32 = 123) : Int32
    id
  end

  @[ARTA::Get("/nilable")]
  def nilable(id : Int32?) : Int32?
    id
  end
end

ATH.run

# GET /default # => 123
# GET /nilable # => null
```

---

## class Athena::Validator::Constraints::PositiveOrZero inherits Athena::Validator::Constraints::GreaterThanOrEqual #

**URL:** https://athenaframework.org/Validator/Constraints/PositiveOrZero/

**Contents:**
- class Athena::Validator::Constraints::PositiveOrZero inherits Athena::Validator::Constraints::GreaterThanOrEqual #
- Configuration#
  - Optional Arguments#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Constructors#
  - .new(message : String = "This value should be positive or zero.", groups : Array(String) | String | Nil = nil, payload : Hash(String, String) | Nil = nil)#
- Methods#

Validates that a value is a positive number, or 0. Use AVD::Constraints::Positive if you don't want to allow 0.

Type: String Default: This value should be positive or zero.

The message that will be shown if the value is not greater than or equal to 0.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

**Examples:**

Example 1 (python):
```python
class Account
  include AVD::Validatable

  def initialize(@balance : Number); end

  @[Assert::PositiveOrZero]
  property balance : Number
end
```

---

## module Athena::Framework::Events::RequestAware #

**URL:** https://athenaframework.org/Framework/Events/RequestAware/

**Contents:**
- module Athena::Framework::Events::RequestAware #
- Direct including types
- Constructors#
  - .new(request : ATH::Request)#
- Methods#
  - #request : ATH::Request#

Represents an event that has access to the current request object.

Returns the current request object.

---

## module Athena::Validator::Violation::ConstraintViolationListInterface #

**URL:** https://athenaframework.org/Validator/Violation/ConstraintViolationListInterface/

**Contents:**
- module Athena::Validator::Violation::ConstraintViolationListInterface #
- Direct including types
- Methods#
  - abstract #add(violation : AVD::Violation::ConstraintViolationInterface) : Nil#
  - abstract #add(violations : AVD::Violation::ConstraintViolationListInterface) : Nil#
  - abstract #has?(index : Int) : Bool#
  - abstract #remove(index : Int) : Nil#
  - abstract #set(index : Int, violation : AVD::Violation::ConstraintViolationInterface) : Nil#
  - abstract #size : Int#
  - abstract #to_json(builder : JSON::Builder) : Nil#

A wrapper type around an Array(AVD::ConstraintViolationInterface).

Adds the provided violation to self.

Adds each of the provided violations to self.

Returns true if a violation exists at the provided index, otherwise false.

Returns the violation at the provided index.

Sets the provided violation at the provided index.

Returns the number of violations in self.

Returns a JSON representation of self.

Returns a string representation of self.

---

## struct Athena::MIME::Address inherits Struct #

**URL:** https://athenaframework.org/MIME/Address/

**Contents:**
- struct Athena::MIME::Address inherits Struct #
- Constructors#
  - .create(address : self | String) : self#
  - .new(address : String, name : String = "")#
- Class methods#
  - .create_multiple(addresses : Enumerable(self | String)) : Array(self)#
  - .create_multiple(*addresses : self | String) : Array(self)#
- Methods#
  - #address : String#
  - #clone#

Represents an email address with an optional name.

Creates a new AMIME::Address.

If the address is already an AMIME::Address, it is returned as is. Otherwise if it's a String, then attempt to parse the name and address from the provided string.

Creates a new AMIME::Address with the provided address and optionally name.

Creates an array of AMIME::Address from the provided enumerable addresses.

Creates an array of AMIME::Address from the provided addresses.

Returns the raw email address portion of this Address. Use #encoded_address to get a safe representation for use in a MIME header.

Returns a copy of self with all instance variables cloned.

Returns an encoded representation of #address safe to use within a MIME header.

Returns an encoded representation of #name safe to use within a MIME header.

Returns true if this Address's localpart contains at least one non-ASCII character. Otherwise returns false.

Returns the raw name portion of this Address, or an empty string if none was set. Use #encoded_name to get a safe representation for use in a MIME header.

Writes an encoded representation of this Address to the provided io for use in a MIME header.

**Examples:**

Example 1 (yaml):
```yaml
AMIME::Address.create_multiple({"[email protected]", "Mr Smith <[email protected]>", AMIME::Address.new("[email protected]")}) # =>
# [
#   Athena::MIME::Address(@address="[email protected]", @name=""),
#   Athena::MIME::Address(@address="[email protected]", @name="Mr Smith"),
#   Athena::MIME::Address(@address="[email protected]", @name=""),
# ]
```

Example 2 (yaml):
```yaml
AMIME::Address.create_multiple "[email protected]", "Mr Smith <[email protected]>", AMIME::Address.new("[email protected]") # =>
# [
#   Athena::MIME::Address(@address="[email protected]", @name=""),
#   Athena::MIME::Address(@address="[email protected]", @name="Mr Smith"),
#   Athena::MIME::Address(@address="[email protected]", @name=""),
# ]
```

Example 3 (javascript):
```javascript
address = AMIME::Address.new "[email protected]", "First Last"
address.address # => "[email protected]"
```

Example 4 (yaml):
```yaml
AMIME::Address.new("contact@athenï.org").encoded_address # => "xn--athen-gta.org"
```

---

## class Athena::Framework::Response::Headers inherits Reference #

**URL:** https://athenaframework.org/Framework/Response/Headers/

**Contents:**
- class Athena::Framework::Response::Headers inherits Reference #
- Constructors#
  - .new(headers : self) : self#
  - .new(headers : HTTP::Headers = HTTP::Headers.new)#
- Methods#
  - #<<(cookie : HTTP::Cookie) : Nil#
  - #==(other : HTTP::Headers) : Bool#
  - #[]=(key : String, value : HTTP::Cookie) : Nil#
  - #[]=(key : String, value : Array(String)) : Nil#
  - #[]=(key : String, value : String) : Nil#

Wraps an HTTP::Headers instance to provide additional functionality.

Forwards all additional methods to the wrapped HTTP::Headers instance.

Utility constructor to allow calling .new with a union of self and HTTP::Headers.

Returns the provided headers object.

Creates a new self, including the data from the provided headers.

Adds the provided cookie to the #cookies container.

Returns true if self is equal to the provided HTTP::Headers instance. Otherwise returns false.

Sets a cookie with the provided key and value.

The key and cookie name must match.

Sets a header with the provided key to the provided value.

This method will override the value of the provided key.

Sets a header with the provided key to the provided value.

This method will override the value of the provided key.

Sets a header with the provided key to the provided value.

This method will override the value of the provided key.

Adds the provided value to the the provided key.

This method will concatenate the value to the provided key.

Adds the provided directive; updating the cache-control header.

Returns an HTTP::Cookies instance that stores cookies related to self.

Returns a Time instance by parsing the datetime string from the header with the provided key.

Returns the provided default if no value with the provided key exists, or if parsing its value fails.

Deletes the header with the provided key.

Clears the #cookies instance if key is set-cookie.

Clears the cache-control header if key is cache-control.

Reinitializes the date header if key is date.

Returns the provided directive from the cache-control header, or nil if it is not set.

Returns true if the current cache-control header has the provided directive. Otherwise returns false.

Removes the provided directive from the cache-control header.

**Examples:**

Example 1 (javascript):
```javascript
time = HTTP.format_time Time.utc 2021, 4, 7, 12, 0, 0
headers = ATH::Response::Headers{"date" => time}

headers.date                 # => 2021-04-07 12:00:00.0 UTC
headers.date "foo"           # => nil
headers.date "foo", Time.utc # => 2021-05-02 14:32:35.257505806 UTC
```

---

## struct Athena::Clock::Native inherits Struct #

**URL:** https://athenaframework.org/Clock/Native/

**Contents:**
- struct Athena::Clock::Native inherits Struct #
- Included modules
- Constructors#
  - .new(location : Time::Location | Nil = nil)#
- Methods#
  - #in_location(location : Time::Location) : self#
  - #now : Time#
  - #sleep(span : Time::Span) : Nil#

The default clock for most use cases which returns the current system time. For example:

Returns a new clock instance set to the provided location.

Returns the current time as determined by the clock.

Sleeps for the provided span of time.

**Examples:**

Example 1 (python):
```python
class ExpirationChecker
  def initialize(@clock : Athena::Clock::Interface); end

  def expired?(valid_until : Time) : Bool
    @clock.now > valid_until
  end
end
```

---

## module Athena::Framework::IPUtils #

**URL:** https://athenaframework.org/Framework/IPUtils/

**Contents:**
- module Athena::Framework::IPUtils #
- Class methods#
  - .check(request_ip : String, ips : String | Enumerable(String)) : Bool#
  - .check_ipv4(request_ip : String, ip : String) : Bool#
  - .check_ipv6(request_ip : String, ip : String) : Bool#

Includes various IP address utility methods.

Returns true if the provided IPv4 or IPv6 request_ip is contained within the list of ips or subnets.

Returns true if request_ip matches ip, or is within the CIDR subnet.

Returns true if request_ip matches ip, or is within the CIDR subnet.

---

## class Athena::Validator::Constraints::GreaterThanOrEqual(ValueType) inherits Athena::Validator::Constraint #

**URL:** https://athenaframework.org/Validator/Constraints/GreaterThanOrEqual/

**Contents:**
- class Athena::Validator::Constraints::GreaterThanOrEqual(ValueType) inherits Athena::Validator::Constraint #
- Configuration#
  - Required Arguments#
    - value#
  - Optional Arguments#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Included modules

Validates that a value is greater than or equal to another.

Type: Number | String | Time

Defines the value that the value being validated should be compared to.

Type: String Default: This value should be greater than or equal to {{ compared_value }}.

The message that will be shown if the value is not greater than or equal to the comparison value.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The payload is not used by Athena::Validator, but its processing is completely up to you.

Returns the AVD::Constraint#message for this constraint.

Returns the AVD::ConstraintValidator.class that should handle validating self.

**Examples:**

Example 1 (python):
```python
class Person
  include AVD::Validatable

  def initialize(@age : Int64); end

  @[Assert::GreaterThanOrEqual(18)]
  property age : Int64
end
```

---

## class Athena::MIME::Exception::HeaderNotFound inherits KeyError #

**URL:** https://athenaframework.org/MIME/Exception/HeaderNotFound/

**Contents:**
- class Athena::MIME::Exception::HeaderNotFound inherits KeyError #
- Included modules

Raised when trying to retrieve a header by name, but there are no headers with that name.

---

## struct Athena::Framework::Controller::ValueResolvers::QueryParameter inherits Struct #

**URL:** https://athenaframework.org/Framework/Controller/ValueResolvers/QueryParameter/

**Contents:**
- struct Athena::Framework::Controller::ValueResolvers::QueryParameter inherits Struct #
- Included modules
- Constructors#
  - .new#
- Methods#
  - #initialize#
  - #resolve(request : ATH::Request, parameter : ATH::Controller::ParameterMetadata)#

Attempts to resolve the value from the request's query parameters for any parameter with the ATHA::MapQueryParameter annotation. Supports most primitive types, as well as arrays of most primitive types, and enums.

The name of the query parameter is assumed to be the same as the controller action parameter's name. This can be customized via the name field on the annotation.

If the controller action parameter is not-nilable nor has a default value and is missing, an ATH::Exception::NotFound exception will be raised by default. Similarly, an exception will be raised if the value fails to be converted to the expected type. The specific type of exception can be customized via the validation_failed_status field on the annotation.

Returns a value resolved from the provided request and parameter if possible, otherwise returns nil if no parameter could be resolved.

**Examples:**

Example 1 (typescript):
```typescript
require "athena"

enum Color
  Red
  Green
  Blue
end

class ExampleController < ATH::Controller
  @[ARTA::Get("/")]
  def index(
    @[ATHA::MapQueryParameter] ids : Array(Int32),
    @[ATHA::MapQueryParameter(name: "firstName")] first_name : String,
    @[ATHA::MapQueryParameter] required : Bool,
    @[ATHA::MapQueryParameter] age : Int32,
    @[ATHA::MapQueryParameter] color : Color,
    @[ATHA::MapQueryParameter] category : String = "",
    @[ATHA::MapQueryParameter] theme : String? = nil,
  ) : Nil
    ids        # => [1, 2]
    first_name # => "Jon"
    required   # => false
    age        # => 123
    color      # => Color::Blue
    category   # => ""
    theme      # => nil
  end
end

ATH.run

# GET /?ids=1&ids=2&firstName=Jon&required=false&age=123&color=blue
```

---

## struct Athena::Framework::Controller::ValueResolvers::UUID inherits Struct #

**URL:** https://athenaframework.org/Framework/Controller/ValueResolvers/UUID/

**Contents:**
- struct Athena::Framework::Controller::ValueResolvers::UUID inherits Struct #
- Included modules
- Constructors#
  - .new#
- Methods#
  - #initialize#
  - #resolve(request : ATH::Request, parameter : ATH::Controller::ParameterMetadata) : ::UUID | Nil#

Handles resolving a UUID from a string value that is stored in the request's ATH::Request#attributes.

Checkout ART::Requirement for an easy way to restrict/validate the version of the UUID that is allowed.

Returns a value resolved from the provided request and parameter if possible, otherwise returns nil if no parameter could be resolved.

**Examples:**

Example 1 (php):
```php
require "athena"

class ExampleController < ATH::Controller
  @[ARTA::Get("/uuid/{uuid}")]
  def get_uuid(uuid : UUID) : String
    "Version: #{uuid.version} - Variant: #{uuid.variant}"
  end
end

ATH.run

# GET /uuid/b115c7a5-0a13-47b4-b4ac-55b3e2686946 # => "Version: V4 - Variant: RFC4122"
```

---

## module Athena::Framework::Events::SettableResponse #

**URL:** https://athenaframework.org/Framework/Events/SettableResponse/

**Contents:**
- module Athena::Framework::Events::SettableResponse #
- Direct including types
- Methods#
  - #response : ATH::Response | ::Nil#
  - #response=(response : ATH::Response) : Nil#

Represents an event where an ATH::Response can be set on self to handle the original ATH::Request.

Once #response= is called, propagation stops; i.e. listeners with lower priority will not be executed.

The response object, if any.

Sets the response that will be returned for the current ATH::Request being handled.

Propagation of self will stop once #response= is called.

---

## enum Athena::MIME::Email::Priority #

**URL:** https://athenaframework.org/MIME/Email/Priority/

**Contents:**
- enum Athena::MIME::Email::Priority #
- Members#
  - HIGHEST = 1#
  - HIGH = 2#
  - NORMAL = 3#
  - LOW = 4#
  - LOWEST = 5#
- Methods#
  - #high?#
  - #highest?#

Returns true if this enum value equals HIGH

Returns true if this enum value equals HIGHEST

Returns true if this enum value equals LOW

Returns true if this enum value equals LOWEST

Returns true if this enum value equals NORMAL

---

## class Athena::Framework::Request inherits Reference #

**URL:** https://athenaframework.org/Framework/Request/

**Contents:**
- class Athena::Framework::Request inherits Reference #
- Constants#
  - FORMATS = {"atom" => Set {"application/atom+xml"}, "css" => Set {"text/css"}, "csv" => Set {"text/csv"}, "form" => Set {"application/x-www-form-urlencoded", "multipart/form-data"}, "html" => Set {"text/html", "application/xhtml+xml"}, "js" => Set {"application/javascript", "application/x-javascript", "text/javascript"}, "json" => Set {"application/json", "application/x-json"}, "jsonld" => Set {"application/ld+json"}, "rdf" => Set {"application/rdf+xml"}, "rss" => Set {"application/rss+xml"}, "txt" => Set {"text/plain"}, "xml" => Set {"text/xml", "application/xml", "application/x-xml"}}#
- Constructors#
  - .new(method : String, path : String, headers : HTTP::Headers | Nil = nil, body : String | Bytes | IO | Nil = nil, version : String = "HTTP/1.1") : self#
  - .new(request : self) : self#
  - .new(request : HTTP::Request)#
- Class methods#
  - .mime_types(format : String) : Set(String)#
  - .override_trusted_header(header : ATH::Request::ProxyHeader, name : String) : Nil#

Wraps an HTTP::Request instance to provide additional functionality.

Forwards all additional methods to the wrapped HTTP::Request instance.

Represents the supported built in formats; mapping the format name to its valid MIME type(s).

Additional formats may be registered via .register_format.

Returns the MIME types for the provided format.

Allows overriding the header name to look for off the request for a given ATH::Request::ProxyHeader. In some cases a proxy might not use the exact x-forwarded-* header name.

See the external documentation for more information.

Registers the provided format with the provided mime_types. Can also be used to change the mime_types supported for an existing format.

Allows setting a list of host_patterns used to whitelist the allowed hostnames of requests. If there is at least one pattern defined, requests whose hostname does NOT match any of the patterns, will receive a 400 response.

See ATH::Bundle:Schema#trusted_hosts for more information.

Allows setting a list of trusted_proxies, and which ATH::Request::ProxyHeader should be whitelisted. The provided proxies are expected to be either IPv4 and/or IPv6 addresses. The special "REMOTE_ADDRESS" string is also supported that will map to the current request's remote address.

See the external documentation for more information.

Returns which ATH::Request::ProxyHeaders have been whitelisted by the application as set via .set_trusted_proxies, defaulting to all of them.

Returns the list of trusted host patterns set via .set_trusted_hosts.

Returns the list of trusted proxy IP addresses as set via .set_trusted_proxies.

The ATH::Action object associated with this request.

Will only be set if a route was able to be resolved as part of ATH::Listeners::Routing.

The ATH::Action object associated with this request.

Will only be set if a route was able to be resolved as part of ATH::Listeners::Routing.

See ATH::ParameterBag.

Returns the Set {"application/atom+xml"}, "css" => Set {"text/css"}, "csv" => Set {"text/csv"}, "form" => Set {"application/x-www-form-urlencoded", "multipart/form-data"}, "html" => Set {"text/html", "application/xhtml+xml"}, "js" => Set {"application/javascript", "application/x-javascript", "text/javascript"}, "json" => Set {"application/json", "application/x-json"}, "jsonld" => Set {"application/ld+json"}, "rdf" => Set {"application/rdf+xml"}, "rss" => Set {"application/rss+xml"}, "txt" => Set {"text/plain"}, "xml" => Set {"text/xml", "application/xml", "application/x-xml"}}" href="#Athena::Framework::Request::FORMATS">Format of the request based on its content-type header, or nil if the header is missing.

If enabled, Athena will populate this hash with files from the request body of multipart/form-data requests.

The keys of the hash map to the name attribute of the related file input control. The value of the hash is an array in order to handle multi-file uploads using the same name.

Returns the format for the provided mime_type.

Returns true if this request originated from a trusted proxy.

See the external documentation for more information.

Returns the host name the request originated from.

Supports reading from ATH::Request::ProxyHeader::FORWARDED_HOST, falling back on the "host" header.

See the external documentation for more information.

Returns the first MIME type for the provided format if defined, otherwise returns nil.

Returns the port on which the request is made.

Supports reading from both ATH::Request::ProxyHeader::FORWARDED_PORT and ATH::Request::ProxyHeader::FORWARDED_HOST, falling back on the "host" header, then #scheme.

See the external documentation for more information.

ameba:disable Metrics/CyclomaticComplexity

Returns the raw wrapped HTTP::Request instance.

Returns an HTTP::Params instance based on this request's form data body.

Returns the format for this request.

First checks if a format was explicitly set via #request_format=. Next, will check for the _format request #attributes, finally falling back on the provided default.

Sets the #request_format to the explicitly passed format.

Returns true if this request's #method is safe. Otherwise returns false.

Returns the scheme of this request.

Returns true the request was made over HTTPS, otherwise returns false.

Supports reading from ATH::Request::ProxyHeader::FORWARDED_PROTO.

See the external documentation for more information.

**Examples:**

Example 1 (yaml):
```yaml
ATH::Request.mime_types "txt" # => Set{"text/plain"}
```

Example 2 (yaml):
```yaml
ATH::Request.register_format "some_format", {"some/mimetype"}
```

Example 3 (javascript):
```javascript
request.format "text/plain" # => "txt"
```

Example 4 (javascript):
```javascript
request.mime_type "txt" # => "text/plain"
```

---

## annotation Athena::Serializer::Annotations::PostDeserialize #

**URL:** https://athenaframework.org/Serializer/Annotations/PostDeserialize/

**Contents:**
- annotation Athena::Serializer::Annotations::PostDeserialize #
  - Example#

Defines a callback method(s) that are ran directly after the object has been deserialized.

**Examples:**

Example 1 (json):
```json
record Example, name : String, first_name : String?, last_name : String? do
  include ASR::Serializable

  @[ASRA::PostDeserialize]
  private def split_name : Nil
    @first_name, @last_name = @name.split(' ')
  end
end

obj = ASR.serializer.deserialize Example, %({"name":"Jon Snow"}), :json

obj.name       # => Jon Snow
obj.first_name # => Jon
obj.last_name  # => Snow
```

---

## struct Athena::MIME::Encoder::RFC2231 inherits Struct #

**URL:** https://athenaframework.org/MIME/Encoder/RFC2231/

**Contents:**
- struct Athena::MIME::Encoder::RFC2231 inherits Struct #
- Included modules
- Constructors#
  - .new#
- Methods#
  - #clone#
  - #encode(input : String, charset : String | Nil = "UTF-8", first_line_offset : Int32 = 0, max_line_length : Int32 | Nil = nil) : String#
  - #initialize#

An encoder based on the RFC2231 spec.

Returns a copy of self with all instance variables cloned.

Returns an encoded version of the provided input.

first_line_offset may optionally be used depending on the exact implementation if the first line needs to be shorter. max_line_length may optionally be used depending on the exact implementation to customize the max length of each line.

---

## struct Athena::EventDispatcher::Callable::Event(E) inherits Athena::EventDispatcher::Callable #

**URL:** https://athenaframework.org/EventDispatcher/Callable/Event/

**Contents:**
- struct Athena::EventDispatcher::Callable::Event(E) inherits Athena::EventDispatcher::Callable #
- Constructors#
  - .new(callback : E -> Nil, priority : Int32 = 0, name : String | Nil = nil, event_class : E.class = E)#

Represents a listener that only accepts the AED::Event instance.

---

## module Athena::Console::Formatter::Interface #

**URL:** https://athenaframework.org/Console/Formatter/Interface/

**Contents:**
- module Athena::Console::Formatter::Interface #
- Direct including types
- Methods#
  - abstract #decorated=(decorated : Bool)#
  - abstract #decorated? : Bool#
  - abstract #format(message : String | Nil) : String#
  - abstract #has_style?(name : String) : Bool#
  - abstract #set_style(name : String, style : ACON::Formatter::OutputStyleInterface) : Nil#
  - abstract #style(name : String) : ACON::Formatter::OutputStyleInterface#

A container that stores and applies ACON::Formatter::OutputStyleInterface. Is responsible for formatting outputted messages as per their styles.

Sets if output messages should be decorated.

Returns true if output messages will be decorated, otherwise false.

Formats the provided message according to the stored styles.

Returns true if self has a style with the provided name, otherwise false.

Assigns the provided style to the provided name.

Returns an ACON::Formatter::OutputStyleInterface with the provided name.

---

## struct Athena::MIME::Encoder::IDNAddress inherits Struct #

**URL:** https://athenaframework.org/MIME/Encoder/IDNAddress/

**Contents:**
- struct Athena::MIME::Encoder::IDNAddress inherits Struct #
- Included modules
- Constructors#
  - .new#
- Methods#
  - #encode(address : String) : String#
  - #initialize#

An IDNA encoder (RFC 5980), defined in RFC 3492.

Encodes the domain part of an address using IDN. This is compatible will all SMTP servers.

The local part is left as-is. In case there are non-ASCII characters in the local part then it depends on the SMTP Server if this is supported.

Returns an encoded version of the provided address.

---

## module Athena::MIME::Header #

**URL:** https://athenaframework.org/MIME/Header/

**Contents:**
- module Athena::MIME::Header #

Namespace for the types used to represent MIME headers.

---

## class Athena::Framework::Events::Action inherits Athena::EventDispatcher::Event #

**URL:** https://athenaframework.org/Framework/Events/Action/

**Contents:**
- class Athena::Framework::Events::Action inherits Athena::EventDispatcher::Event #
- Included modules
- Constructors#
  - .new(request : ATH::Request, action : ATH::ActionBase)#
- Methods#
  - #action : ATH::ActionBase#

Emitted after ATH::Events::Request and the related ATH::Action has been resolved, but before it has been executed.

See the Getting Started docs for more information.

The related ATH::Action that will be used to handle the current request.

---

## class Athena::Validator::Constraints::NegativeOrZero inherits Athena::Validator::Constraints::LessThanOrEqual #

**URL:** https://athenaframework.org/Validator/Constraints/NegativeOrZero/

**Contents:**
- class Athena::Validator::Constraints::NegativeOrZero inherits Athena::Validator::Constraints::LessThanOrEqual #
- Configuration#
  - Optional Arguments#
    - message#
      - Placeholders#
    - groups#
    - payload#
- Constructors#
  - .new(message : String = "This value should be negative or zero.", groups : Array(String) | String | Nil = nil, payload : Hash(String, String) | Nil = nil)#
- Methods#

Validates that a value is a negative number, or 0. Use AVD::Constraints::Negative if you don't want to allow 0.

Type: String Default: This value should be negative or zero.

The message that will be shown if the value is not less than or equal to 0.

The following placeholders can be used in this message:

Type: Array(String) | String | Nil Default: nil

The validation groups this constraint belongs to. AVD::Constraint::DEFAULT_GROUP is assumed if nil.

Type: Hash(String, String)? Default: nil

Any arbitrary domain-specific data that should be stored with this constraint. The AVD::Constraint@payload is not used by Athena::Validator, but its processing is completely up to you

**Examples:**

Example 1 (python):
```python
class Mall
  include AVD::Validatable

  def initialize(@lowest_floor : Number); end

  @[Assert::NegativeOrZero]
  property lowest_floor : Number
end
```

---

## Athena::Framework::Bundle::Schema::FileUploads#

**URL:** https://athenaframework.org/Framework/Bundle/Schema/FileUploads/

**Contents:**
- Athena::Framework::Bundle::Schema::FileUploads#
- Configuration Properties
  - enabled#
  - temp_dir#
  - max_uploads#
  - max_file_size#

Configures settings related to file uploads.

ATH.configure({ framework: { file_uploads: { enabled: true, }, }, }) See the Getting Started docs for more information.

If false, native file upload support will be disabled and related types will not be included in the resulting binary.

The directory where temp files will be stored while requests are being processed. If nil, then a directory called athena will be used within the system's tempdir by default.

If providing a custom directory, it MUST already exist.

Controls how many files may be uploaded at once.

The maximum allowed file size, in bytes, that are allowed to be uploaded. Defaults to 10 MiB.

**Examples:**

Example 1 (css):
```css
ATH.configure({
  framework: {
    file_uploads: {
      enabled: true,
    },
  },
})
```

---

## module Athena::Framework::Events #

**URL:** https://athenaframework.org/Framework/Events/

**Contents:**
- module Athena::Framework::Events #

The AED::Event that are emitted via Athena::EventDispatcher to handle a request during its life-cycle. Custom events can also be defined and dispatched within a controller, listener, or some other service.

See each specific event and the Getting Started docs for more information.

---

## class Athena::Framework::Exception::TooManyRequests inherits Athena::Framework::Exception::HTTPException #

**URL:** https://athenaframework.org/Framework/Exception/TooManyRequests/

**Contents:**
- class Athena::Framework::Exception::TooManyRequests inherits Athena::Framework::Exception::HTTPException #
- Constructors#
  - .new(message : String, retry_after : Number | String | Nil = nil, cause : ::Exception | Nil = nil, headers : HTTP::Headers = HTTP::Headers.new)#

See Athena::Framework::Exception::HTTPException#new.

If retry_after is provided, adds a retry-after header that represents the number of seconds or HTTP-date after which the request may be retried.

---

## module Athena::Console::Exception #

**URL:** https://athenaframework.org/Console/Exception/

**Contents:**
- module Athena::Console::Exception #
- Direct including types
- Methods#
  - #code : Int32#

Both acts as a namespace for exceptions related to the Athena::Console component, as well as a way to check for exceptions from the component. Exposes a #code method that represents the exit code of a command invocation.

Returns the exit code that should be used for this exception.

---

## class Athena::Console::Helper::ProgressIndicator inherits Reference #

**URL:** https://athenaframework.org/Console/Helper/ProgressIndicator/

**Contents:**
- class Athena::Console::Helper::ProgressIndicator inherits Reference #
  - Customizing#
    - Built-in Formats#
    - Custom Indicator Values#
    - Custom Placeholders#
- Constructors#
  - .new(output : ACON::Output::Interface, format : ACON::Helper::ProgressIndicator::Format | Nil = nil, indicator_change_interval : Time::Span = 100.milliseconds, indicator_values : Indexable(String) | Nil = nil, clock : ACLK::Interface = ACLK::Monotonic.new, finished_indicator : String = "✔")#
- Class methods#
  - .placeholder_formatter(name : String) : ACON::Helper::ProgressIndicator::PlaceholderFormatter | Nil#
  - .set_placeholder_formatter(name : String, &block : self -> String) : Nil#

Progress indicators are useful to let users know that a command isn't stalled. However, unlike ACON::Helper::ProgressBars, these indicators are used when the command's duration is indeterminate, such as long-running commands or tasks that are quantifiable.

The progress indicator comes with a few built-in formats based on the ACON::Output::Verbosity the command was executed with:

If a command called with ACON::Output::Verbosity::QUIET, the progress bar will not be displayed.

The format may also be set explicitly in code within the constructor:

Custom indicator values may also be used:

The progress indicator would now look like:

A progress indicator uses placeholders (a name enclosed with the % character) to determine the output format. The built-in placeholders include:

These can be customized via .set_placeholder_formatter.

Placeholder customization is global and would affect any indicator used after calling .set_placeholder_formatter.

Returns the global formatter for the provided name if it exists, otherwise nil.

Registers a custom placeholder with the provided name with the block being the formatter.

Registers a custom placeholder with the provided name, using the provided callable as the formatter.

Advance the indicator to display the next indicator character.

Display the current state of the indicator.

Completes the indicator with the provided message.

Sets the message to display alongside the indicator.

Starts and displays the indicator with the provided message.

**Examples:**

Example 1 (julia):
```julia
# Create a new progress indicator.
indicator = ACON::Helper::ProgressIndicator.new output

# Start and display the progress indicator with a custom message.
indicator.start "Processing..."

50.times do
  # Do work

  # Advance the progress indicator.
  indicator.advance
end

# Ensure the progress indicator shows a final completion message
indicator.finish "Finished!"
```

Example 2 (markdown):
```markdown
# Verbosity::NORMAL (CLI with no verbosity flag)
 \ Processing...
 | Processing...
 / Processing...
 - Processing...

# Verbosity::VERBOSE (-v)
 \ Processing... (1 sec)
 | Processing... (1 sec)
 / Processing... (1 sec)
 - Processing... (1 sec)

# Verbosity::VERY_VERBOSE (-vv) and Verbosity::DEBUG (-vvv)
 \ Processing... (1 sec, 1kiB)
 | Processing... (1 sec, 1kiB)
 / Processing... (1 sec, 1kiB)
 - Processing... (1 sec, 1kiB)
```

Example 3 (yaml):
```yaml
# If the progress bar has a maximum number of steps.
ACON::Helper::ProgressIndicator.new output, format: :very_verbose
```

Example 4 (julia):
```julia
indicator = ACON::Helper::ProgressIndicator.new output, indicator_values: %w(⠏ ⠛ ⠹ ⢸ ⣰ ⣤ ⣆ ⡇)
```

---

## Introduction

**URL:** https://athenaframework.org/Negotiation/

**Contents:**
- Introduction
- Installation#
- Usage#
  - Media Type#
  - Character Set#
  - Encoding#
  - Language#

The Athena::Negotiation component allows an application to support content negotiation. The component has no dependencies and is framework agnostic; supporting various negotiators.

First, install the component by adding the following to your shard.yml, then running shards install:

The main type of Athena::Negotiation is ANG::AbstractNegotiator which is used to implement negotiators for each Accept* header. Athena::Negotiation exposes class level getters for each negotiator; that return a lazily initialized singleton instance. Each negotiator exposes two methods: ANG::AbstractNegotiator#best and ANG::AbstractNegotiator#ordered_elements.

The ANG::Negotiator type returns an ANG::Accept, or nil if negotiating the best media type has failed.

The ANG::CharsetNegotiator type returns an ANG::AcceptCharset, or nil if negotiating the best character set has failed.

The ANG::EncodingNegotiator type returns an ANG::AcceptEncoding, or nil if negotiating the best encoding has failed.

The ANG::LanguageNegotiator type returns an ANG::AcceptLanguage, or nil if negotiating the best language has failed.

**Examples:**

Example 1 (yaml):
```yaml
dependencies:
  athena-negotiation:
    github: athena-framework/negotiation
    version: ~> 0.2.0
```

Example 2 (javascript):
```javascript
negotiator = ANG.negotiator

accept_header = "text/html, application/xhtml+xml, application/xml;q=0.9"
priorities = ["text/html; charset=utf-8", "application/json", "application/xml;q=0.5"]

accept = negotiator.best(accept_header, priorities).not_nil!

accept.media_range # => "text/html"
accept.parameters  # => {"charset" => "utf-8"}
```

Example 3 (javascript):
```javascript
negotiator = ANG.charset_negotiator

accept_header = "ISO-8859-1, utf-8; q=0.9"
priorities = ["iso-8859-1;q=0.3", "utf-8;q=0.9", "utf-16;q=1.0"]

accept = negotiator.best(accept_header, priorities).not_nil!

accept.charset # => "utf-8"
accept.quality # => 0.9
```

Example 4 (javascript):
```javascript
negotiator = ANG.encoding_negotiator

accept_header = "gzip;q=1.0, identity; q=0.5, *;q=0"
priorities = ["gzip", "foo"]

accept = negotiator.best(accept_header, priorities).not_nil!

accept.coding # => "gzip"
```

---
